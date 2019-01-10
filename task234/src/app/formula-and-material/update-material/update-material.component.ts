import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormulaAndMaterialComponent } from '../formula-and-material.component';
import { DbService } from '../../db.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent implements OnInit {
  materialId: number;
  cost: number;
  materialName: string;
  arrs: any = [];
  constructor(public updateMaterialDialogRef: MatDialogRef<FormulaAndMaterialComponent>,
              public snackBar: MatSnackBar,
              private data: DbService, @Inject(MAT_DIALOG_DATA)
              private oldData: any) {}

  ngOnInit() {
    // console.log(this.oldData)
    // console.log(this.oldData.oldDataRow[0].materialName)
    this.materialId = this.oldData.oldDataRow[0].materialId;
    this.materialName = this.oldData.oldDataRow[0].materialName;
    this.cost = this.oldData.oldDataRow[0].cost;
    this.arrs.push({'materialName': this.oldData.oldDataRow[0].materialName, 'materialCost': this.oldData.oldDataRow[0].cost});
  }
  add() {
        this.arrs.push({'materialName': '', 'materialCost': 0});
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
      const materialData = {
        materialId: this.materialId,
        materialName: this.materialName,
        cost: this.cost
      };
    if (this.cost <= 0 || this.cost === undefined) {
      this.openSnackBar('欄位不可為空白或是小於等於0');
    } else {
        this.data.updateSingleMaterial(materialData).subscribe(
          (res) => {
            this.openSnackBar('修改成功');
            this.closeDialog();
          },
          (err) => {
            this.openSnackBar('修改失敗');
            this.closeDialog();
          }
        );


      }

  }

  closeDialog() {
    this.updateMaterialDialogRef.close(true);
   }
}
