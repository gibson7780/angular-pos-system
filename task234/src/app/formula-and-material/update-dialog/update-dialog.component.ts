import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DbService } from '../../db.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormulaAndMaterialComponent } from '../formula-and-material.component';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  arrs: any = [];
  formulaName: string;
  cost = 0;
  materialOptions: any = [];
  price: number;
  constructor(public updateDialogRef: MatDialogRef<FormulaAndMaterialComponent>,
              private dialog: MatDialog,
              public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any,
              private el: ElementRef,
              private dbData: DbService) {}

  ngOnInit() {
    this.dbData.getMaterials().subscribe(data => {
      // console.log(data);

      for (let i = 0; i < data.length; i ++) {
        this.materialOptions.push(data[i].materialName);

      }
      // console.log(this.materialOptions);
    });
    this.formulaName = this.data.oldDataRow.formulaName;
    this.price = this.data.oldDataRow.price;
    // console.log(this.data.oldDataRow.contents[0].material);
    for (let i = 0; i < this.data.oldDataRow.contents.length; i ++) {
      this.arrs.push({'material': this.data.oldDataRow.contents[i].material,
                      'amount': this.data.oldDataRow.contents[i].amount,
                      'materialCost': this.data.oldDataRow.contents[i].materialCost,
                      'materialId': this.data.oldDataRow.contents[i].materialId,
                      'formulaId': this.data.oldDataRow.formulaId});
      this.cost += this.data.oldDataRow.contents[i].materialCost * this.data.oldDataRow.contents[i].amount;
      // console.log(this.arrs);
    }

  }
  add() {
    // for ( let i = 0 l i < ths.arrs.length)

    this.arrs.push({'material': '', 'amount': 0, 'materialCost': 0});

      // const matInputs = this.el.nativeElement.querySelectorAll('.amount');
      // console.log(matInputs[matInputs.length - 1].value)

  }
   addMaterial($event, idn) {
     // console.log(idn)
     // console.log($event);
     this.dbData.getSingleMaterial($event.value).subscribe(data => {
      // console.log(this.arrs.length);

        this.arrs[idn].material = data.materialName;
        this.arrs[idn].materialCost = data.cost;
        console.log(this.arrs);
        // this.doCost();


     });
   }
  delete(id) {
    // console.log(id);
    this.arrs.splice(id, 1);
  }
  doCost(value, idn) {
    // console.log(value)

      if (value) {
      this.arrs[idn].amount = parseFloat(value);
    }
    const costInput = this.el.nativeElement.querySelectorAll('.amount');
    // console.log(costInput);
    this.cost = 0;
    for (let i = 0; i < costInput.length; i++) {
      this.cost += costInput[i].value * this.arrs[i].materialCost;
    }
    // console.log(this.arrs);
  }

// 送出修改資料
  sendDB() {
    let trig1 = 1;
    let trig2 = 1;
    if (this.price === 0 || this.price === undefined || this.price <= 0) {
      // this.openSnackBar('欄位不可為空白或是小於等於0');
      trig1 = 0;
    }


    for (let i = 0; i < this.arrs.length; i++) {
      if (this.arrs[i].amount <= 0 || this.arrs[i].amount === undefined || this.arrs[i].amount === '') {
        // this.openSnackBar('欄位不可為空白或是小於等於0');
        trig2 = 0;
      }
    }



      if (trig1 === 1 && trig2 === 1) {
        const updateFormulaData = {
          formulaId: this.data.oldDataRow.formulaId,
          cost: this.cost,
          price: Number(this.price)
              };
        for (let i = 0; i < this.arrs.length; i++) {
          var updateContentData = {
            formulaId: this.arrs[i].formulaId,
            materialId: this.arrs[i].materialId,
            amount: this.arrs[i].amount
              };
        }

          this.dbData.upDateFormula(updateFormulaData).subscribe(
            (forData) => {
                  this.dbData.upDateContent(updateContentData).subscribe(
                    (conData) => {
                      this.openSnackBar('儲存成功');
                      this.closeDialog();

                    },
                    (conErr) => {
                      this.openSnackBar('儲存失敗');
                    });

            },
            (forErr) => {
              this.openSnackBar('儲存失敗');
            });
      } else {
        this.openSnackBar('欄位不可為空白或是小於等於0');
      }
  }



  openSnackBar(massage) {
    this.snackBar.open(massage, '關閉', {
      duration: 5000,
    });
  }
  closeDialog() {
    this.updateDialogRef.close('close');
  }
}
