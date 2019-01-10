import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DbService } from '../../db.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormulaAndMaterialComponent } from '../formula-and-material.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  arrs: any = [];
  materialName: string;
  amount: any;
  formulaName: string;
  cost = 0;
  materialOptions: any = [];
  price: number;
  constructor(public createDialogRef: MatDialogRef<FormulaAndMaterialComponent>,
              private dialog: MatDialog,
              public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any,
              private el: ElementRef,
              private dbData: DbService) {}

  ngOnInit() {
    this.arrs.push({'materialName': '', 'amount': 0, 'materialCost': 0});

    this.dbData.getMaterials().subscribe(data => {
      // console.log(data);

      for (let i = 0; i < data.length; i ++) {
        this.materialOptions.push(data[i].materialName);

      }
      // console.log(this.materialOptions);
    });

  } // ngOnInit()
  add() {
   this.arrs.push({'materialName': '', 'amount': 0, 'materialCost': 0});

  }
   addMaterial($event, idn) {
     // console.log(idn)
     // console.log($event);
     this.dbData.getSingleMaterial($event.value).subscribe(data => {
      // console.log(this.arrs.length);
      // console.log(data);

      // for (let i = 0; i < this.arrs.length) {
      this.arrs[idn].materialName = data.materialName;
      this.arrs[idn].materialCost = data.cost;
      this.arrs[idn].materialId = data.materialId;
      // console.log(this.arrs);
      this.doCost(null, null);
      // }
     // this.arrs.push({'material': this.data.oldDataRow.contents[i].material,
     //  'amount': this.data.oldDataRow.contents[i].amount, 'materialCost': this.data.oldDataRow.contents[i].materialCost});


     });
   }
  delete(id) {
    if (this.arrs.length === 1) {
      this.openSnackBar('最少一個原料');
    } else {
    this.arrs.splice(id, 1);
    // console.log(this.arrs.length)
    }
    this.doCost(null, null);
  }
  doCost(value, idn) {
    // console.log(value)

      if (value !== null && idn !== null) {
      this.arrs[idn].amount = parseFloat(value);

      }
    const costInput = this.el.nativeElement.querySelectorAll('.amount');
    // console.log(costInput.length);
    this.cost = 0;
    for (let i = 0; i < this.arrs.length; i++) {
      this.cost += costInput[i].value * this.arrs[i].materialCost;
    }
    // console.log(this.arrs);
  } // doCost

  sendDB() {
    // console.log(this.price)
    let trig1 = 1;
    let trig2 = 1;
    let trig3 = 1;
    let trig4 = 1;
    this.dbData.getFormulas().subscribe(
      (forData) => {
        // console.log(forData)
        for (let i = 0; i < forData.length; i++) {
          for (let j = 0; j < this.arrs.length; j++) {
            if (forData[i].formulaName === this.arrs[j].materialName) {
              this.openSnackBar('已有相同名稱的配方 : ' + this.arrs[j].materialName);
              trig3 = 0;
            }
          }
        }
      },
      (forErr) => {

      }
    );



    if (this.formulaName === undefined || this.price <= 0 || this.price === undefined) {
      this.openSnackBar('欄位不可為空白或是0');
      trig1 = 0;
    }

    for (let i = 0; i < this.arrs.length; i++) {
      if (this.arrs[i].materialName === undefined || this.arrs[i].amount === undefined || this.arrs[i].amount <= 0) {
        this.openSnackBar('欄位不可為空白或是0');
        trig2 = 0;
      }
    }
    let count = 0;
    for (let i = 0; i < this.arrs.length; i++) {
      for (let j = 0; j < this.arrs.length; j++) {
        if (this.arrs[i].materialName === this.arrs[j].materialName) {
          count += 1;
          if (count > this.arrs.length) {
            this.openSnackBar('原料不可重複');
            trig4 = 0;
          }
        }
      }
    }

    if (trig1 === 1 && trig2 === 1 && trig3 === 1 && trig4 === 1) {
      const formulaData = {
        formulaName: this.formulaName,
        cost: this.cost,
        price: Number(this.price)
            };
      // console.log(formulaData);
      this.dbData.createFormula(formulaData).subscribe(
        (createForRes) => {
          setTimeout( () => {
              this.dbData.getSingleFormula(this.formulaName).subscribe(
                (searchData) => {
                // console.log(searchData)
                for (let i = 0; i < this.arrs.length; i++) {
                  const contentData = {
                    formulaId: searchData.formulaId,
                    materialId: this.arrs[i].materialId,
                    amount: this.arrs[i].amount
                        };
                  console.log(contentData);
                  this.dbData.createContent(contentData).subscribe(
                    (createRes) => {
                      this.openSnackBar('新增成功');
                      this.closeDialog();
                    },
                    (createErr) => {
                      this.openSnackBar('新增失敗');
                    }
                  );
                }

              },
              (searchErr) => {
                this.openSnackBar('新增失敗');
              }
            );
          }, 500);

        },
        (createForErr) => {
          this.openSnackBar('新增失敗');
        }
      );
    }
  } // sendDB


  openSnackBar(massage) {
    this.snackBar.open(massage, '關閉', {
      duration: 5000,
    });
  }
  closeDialog() {
    this.createDialogRef.close(true);
  }
}
