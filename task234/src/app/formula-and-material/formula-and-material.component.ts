import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { DbService } from '../db.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { CreateMaterialComponent } from './create-material/create-material.component';
import { UpdateMaterialComponent } from './update-material/update-material.component';
import { AlertMaterialComponent } from './alert-material/alert-material.component';

@Component({
  selector: 'app-formula-and-material',
  templateUrl: './formula-and-material.component.html',
  styleUrls: ['./formula-and-material.component.css'],
      animations: [
        trigger('listStagger', [
          transition('* <=> *', [
            query(':enter',
            [
              style({ opacity: 0, transform: 'translateY(-15px)' }),
              stagger('50ms',
              animate('550ms ease-out',
              style({ opacity: 1, transform: 'translateY(0px)' })))
            ], { optional: true }),
              query(':leave', animate('50ms', style({ opacity: 0 })), {
                optional: true
            })
          ])
        ])
      ]
})
export class FormulaAndMaterialComponent implements OnInit {
  emailsDataFormula: any = new MatTableDataSource<any>();
  emailsDataMaterial: any = new MatTableDataSource<any>();
  users$: Object;
  materials$: Object;
  oldData: any;
  test$: Object;
  // displayedColumns: string[] = ['material', 'name', 'progress', 'color'];
  // dataSource: MatTableDataSource<UserData>;
  // @ViewChild('filter') filter: ElementRef;
  @ViewChild('formulapaginator') paginatorFormula: MatPaginator;
  @ViewChild(MatSort) sortFormula: MatSort;
  @ViewChild('materialpaginator') paginatorMaterial: MatPaginator;
  @ViewChild(MatSort) sortMaterial: MatSort;
  constructor(public snackBar: MatSnackBar,
              private data: DbService,
              private httpClient: HttpClient,
              public dialog: MatDialog) {}

  ngOnInit() {

  // getFormulas()
  this.getformula();
  this.getMaterial();

  }

  applyFilterFormula(filterValue: string) {
    // console.log(filterValue);
    // this.emailsDataSource.filter = filterValue.trim().toLowerCase();
    this.emailsDataFormula.filter = filterValue.trim().toLowerCase();
    this.emailsDataFormula.filterPredicate = (data: any, filter: string): boolean => {
    return data.formulaName.indexOf(filter) !== -1;
      };

    }
  applyFilterMaterial(filterValue: string) {
    // console.log(filterValue);
    // this.emailsDataSource.filter = filterValue.trim().toLowerCase();
    this.emailsDataMaterial.filter = filterValue.trim().toLowerCase();
    this.emailsDataMaterial.filterPredicate = (data: any, filter: string): boolean => {
    return data.materialName.indexOf(filter) !== -1;
      };

    }

  createDialog() {
      // this.data.getFormulas().subscribe(data => {
        const createDialogRef = this.dialog.open(DialogComponent);

          createDialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                setTimeout(() => {
                  this.getformula();
                }, 1000);
            }
          });

      // });

  }

  updateDialog(id) {


    this.data.getFormulas().subscribe(data => {
      // console.log(data[0].formulaId);
      // console.log(this.oldData);
      // const oldData = data;
      for (let i = 0; i < this.oldData.length; i++) {
        if (id === this.oldData[i].formulaId) {
      const updateDialogRef = this.dialog.open(UpdateDialogComponent, {
            data: {
              oldDataRow: this.oldData[i]
            }
          });

        updateDialogRef.afterClosed().subscribe(result => {
          // console.log(result);
          if (result) {
            setTimeout(() => {
              this.getformula();
            }, 500);
          }
        });

          // Close Dialog
          // dialogRef.close('Closed');

        }
      }
          // dialogRef.componentInstance.doConfirm.subscribe(() => {
          //   console.log('開啟的dialog按下確認按鈕了');
          // });

    });

  }
 getMaterial() {
        this.data.getMaterials().subscribe(data => {
         // this.purchases = data;
         this.materials$ = data;
         this.emailsDataMaterial.data = data;
         this.emailsDataMaterial.paginator = this.paginatorMaterial;
         // this.emailsDataMaterial.sort = this.sortMaterial;
         // if (this.emailsDataMaterial.paginator) {
         // this.emailsDataMaterial.paginator.firstPage();
         // }
                // console.log(this.emailsDataMaterial.data);
       });
 }

  getformula() {

     this.data.getFormulas().subscribe(data => {
       this.oldData = data;

       this.data.getContents().subscribe(contentsData => {
         console.log(contentsData);
         for (let i = 0; i < data.length; i++) {
             data[i].contents = [];
           for (let j = 0; j < contentsData.length; j++) {
             if (data[i].formulaId === contentsData[j].formulaId) {
                data[i].contents.push({
                   'material': contentsData[j].materialName,
                   'amount': contentsData[j].amount,
                   'materialCost': contentsData[j].materialCost,
                   'materialId': contentsData[j].materialId
                 });
              }
            }
          }

       });
       // console.log(data);
           this.emailsDataFormula.data = data;
           this.emailsDataFormula.paginator = this.paginatorFormula;
           this.emailsDataFormula.sort = this.sortFormula;
           // if (this.emailsDataFormula.paginator) {
           // this.emailsDataFormula.paginator.firstPage();
           // }

    });
  } // getformula

  confirmBox(formulaId) {
    const confrimDialogRef = this.dialog.open(AlertBoxComponent);

    confrimDialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
          this.doDeleteFormula(formulaId);
      }
    });

  }
  doDeleteFormula(formulaId) {
    // console.log(formulaId)
    this.data.deleteshipment(formulaId).subscribe(
      (res) => {
      this.data.deleteContent(formulaId).subscribe(
        (contentRes) => {
              setTimeout(() => {
                this.data.deleteFormula(formulaId).subscribe(
                  (formulaRes) => {
                     setTimeout(() => {
                       this.getformula();
                       this.openSnackBar('刪除成功');
                     }, 500);
                  },
                  (formulaErr) => {
                    this.openSnackBar('刪除失敗');
                  }
                );
              }, 200);
        },
        (contentErr) => {
          this.openSnackBar('刪除失敗');
        }
      );
    },
    (err) => {
      this.openSnackBar('刪除失敗');
    });

  }

  openSnackBar(massage) {
    this.snackBar.open(massage, '關閉', {
      duration: 5000,
    });
  }

// material area
  createMaterialDiag() {
    const createMaterialDialogRef = this.dialog.open(CreateMaterialComponent);

    createMaterialDialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        setTimeout(() => {
            this.getMaterial();
        }, 500);
      }
    });

  }
  updateMaterialDiag(id) {
    // console.log(id);
    this.data.getSingleMaterialId(id).subscribe(data => {
      // console.log(data);
      const updateMaterialDialogRef = this.dialog.open(UpdateMaterialComponent, {
            data: {
              oldDataRow: data
            }
          });

      updateMaterialDialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if (result) {
            this.getMaterial();
        }
      });

    });

  }
  doDeletematerial(materialId) {
    // 出貨紀錄刪除
    this.data.getContentMaterial(materialId).subscribe(
      (conMatData) => {
        // console.log(conMatData);
        if (conMatData.length > 0) {
          this.openSnackBar('該原料還有正在使用的配方');
        } else {
          this.data.deletePurchases(materialId).subscribe(
            (delRes) => {
                    this.data.deleteMaterial(materialId).subscribe(
                      (res) => {
                        setTimeout(() => {
                          this.getMaterial();
                          this.openSnackBar('刪除成功');
                        }, 500);
                      },
                      (err) => {
                        this.openSnackBar('刪除失敗');
                      }
                    );


            },
            (err) => {
              this.openSnackBar('刪除失敗');
            }
          );
        }
      },
      (conMaterr) => {
        this.openSnackBar('請檢查伺服器');
      }
    );
    // this.data.deleteshipment(materialId).subscribe();

    // 配方刪除


  } // doDeletematerial

  confirmDeleteMaterial(materialId) {
    const confirmDeleteDialogRef = this.dialog.open(AlertMaterialComponent);

    confirmDeleteDialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.doDeletematerial(materialId);
      }
    });

  } // confirmDeleteMaterial
}
