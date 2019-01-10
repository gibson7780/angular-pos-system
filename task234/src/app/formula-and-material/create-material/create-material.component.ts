import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormulaAndMaterialComponent } from '../formula-and-material.component';
import { DbService } from '../../db.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  cost: number;
  materialName: string;
  arrs: any = [];
  materialArr: any = [];
  constructor(public createMaterialDialogRef: MatDialogRef<FormulaAndMaterialComponent>,
              public snackBar: MatSnackBar,
              private data: DbService) { }

  ngOnInit() {
    this.data.getMaterials().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.materialArr.push(data[i].materialName);
      }
      // this.materialArr.push(data.materialName);
      // console.log(this.materialArr);
    });
    this.arrs.push({'materialName': '', 'materialCost': 0});
  }
  add() {
        this.arrs.push({'materialName': '', 'materialCost': 0});
  }
  delete(id) {
    if (this.arrs.length === 1) {
      this.openSnackBar('最少一個原料');
    } else {
    this.arrs.splice(id, 1);
    }
  }
  openSnackBar(massage) {
    this.snackBar.open(massage, '關閉', {
      duration: 5000,
    });
  }

  saveMaterialName(materialName, idn) {
    this.arrs[idn].materialName = materialName;
    // console.log(this.arrs);
  }
  saveMaterialCost(materialCost, idn) {
    this.arrs[idn].materialCost = parseFloat(materialCost);
    // console.log(this.arrs);
  }
  sendDB() {
    let trig1 = 1;
    let trig2 = 1;
    for (let i = 0; i < this.materialArr.length; i++) {
      for (let j = 0; j < this.arrs.length; j++) {
        if (this.materialArr[i] === this.arrs[j].materialName) {
          this.openSnackBar('已有相同名稱的原料 : ' + this.arrs[j].materialName);
          trig1 = 0;
        }
      }
    }
    for (let i = 0; i < this.arrs.length; i++) {
      if (this.arrs[i].materialName === undefined ||
        this.arrs[i].materialCost <= 0 ||
        this.arrs[i].materialCost === '' ||
        this.arrs[i].materialCost === undefined) {
          this.openSnackBar('欄位不可空白或是0');
          trig2 = 0;
      }
    }

    if (trig1 === 1 && trig2 === 1) {
      for (let i = 0; i < this.arrs.length; i++) {
          const materialData = {
            materialName: this.arrs[i].materialName,
            cost: this.arrs[i].materialCost
          }
        // console.log(materialData);
        this.data.createMaterial(materialData).subscribe(
          (data) => {
            this.openSnackBar('新增成功');
            this.closeDialog();
          },
          (err) => {
            this.openSnackBar('新增失敗');
          }
        );
      }
    }

  }

  closeDialog() {
    this.createMaterialDialogRef.close(true);
   }
}
