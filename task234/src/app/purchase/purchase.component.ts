import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { DbService } from '../db.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import * as moment from 'moment';

import { MatStepperIntl, ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
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
export class PurchaseComponent implements OnInit {

  // startDate = moment(new Date(1999, 0, 1));
  emailsDataSource: any = new MatTableDataSource<any>();
  purchases$: Object;
  materials$: Object;
  purchase: Object;

  // @ViewChild('myInput') input: ElementRef;
  // displayedColumns: string[] = ['material', 'name', 'progress', 'color'];
  // dataSource: MatTableDataSource<UserData>;
  // @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public snackBar: MatSnackBar, private data: DbService, private httpClient: HttpClient, private el: ElementRef) {

  }

  ngOnInit() {
    const time = new Date();
    console.log(time);
    // 點選出貨紀錄更新最新筆記錄
  setTimeout(() => {
    // console.log(this.el.nativeElement.querySelectorAll('.mat-tab-label'));
    const titleLabel = this.el.nativeElement.querySelectorAll('.mat-tab-label');
    titleLabel[1].addEventListener('click', () => {
      this.data.getPurchases().subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          data[i].purchaseDate = data[i].purchaseDate.replace('T', ' ');
          data[i].purchaseDate = data[i].purchaseDate.replace('.000Z', '');
        }
       this.purchases$ = data;
       console.log(data);
          });
        });
    }, 0);

     this.data.getMaterials().subscribe(data => {
      // this.purchases = data;
      this.emailsDataSource.data = data;
      this.emailsDataSource.paginator = this.paginator;
      this.emailsDataSource.sort = this.sort;
      if (this.emailsDataSource.paginator) {
      this.emailsDataSource.paginator.firstPage();
      }


    });
     this.data.getPurchases().subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          data[i].purchaseDate = data[i].purchaseDate.replace('T', ' ');
          data[i].purchaseDate = data[i].purchaseDate.replace('.000Z', '');
        }
        this.purchases$ = data;
    });

  }
  // 篩選
  applyFilters(filterValue: string) {
    // console.log(filterValue);
    // this.emailsDataSource.filter = filterValue.trim().toLowerCase();
    this.emailsDataSource.filter = filterValue.trim().toLowerCase();
    this.emailsDataSource.filterPredicate = (data: any, filter: string): boolean => {
      return data.materialName.indexOf(filter) !== -1;
    };
    }

// 新增出貨紀錄
  createPurchase(rowData, idn) {
    const inputDate = this.el.nativeElement.querySelector('#' + rowData.materialName + idn).value;
    console.log(inputDate);
    const inputValue = this.el.nativeElement.querySelector('#' + rowData.materialName).value;
    this.el.nativeElement.querySelector('#' + rowData.materialName).value = '';
    if (inputValue !== '' && parseInt(inputValue, 10) > 0 ) {
      if (inputDate === '') {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const sec = date.getSeconds();
        const mins = date.getMinutes();
        const newDate = year + '-' + month + '-' + day + ' ' + hour + ':' + mins + ':' + sec;
        // console.log(newDate);
        // console.log(year + '-' + month + '-' + day);
        // this.data.getPurchaseRow(rowData.materialId).subscribe( data =>{
          // this.purchase = data;

          const newData = {
                  userId: 1,
                  materialId: rowData.materialId,
                  counts: parseInt(inputValue, 10),
                  total: parseInt(inputValue, 10) * rowData.cost,
                  purchaseDate: newDate
                };

          // console.log(newData);
          this.data.createPurchases(newData).subscribe(
            (purRes) => {
              this.openSnackBar('進貨成功');
              this.el.nativeElement.querySelector('#' + rowData.materialName + idn).value = '';
            },
            (purErr) => {
              this.openSnackBar('進貨失敗');
            }
          );

        } else {

            const newDate = inputDate + ' ' + '00:00:00';
            console.log(newDate);
            const newData = {
                    userId: 1,
                    materialId: rowData.materialId,
                    counts: parseInt(inputValue, 10),
                    total: inputValue * rowData.cost,
                    purchaseDate: newDate
                  };

            this.data.createPurchases(newData).subscribe(
              (purRes) => {
                this.openSnackBar('進貨成功');
                this.el.nativeElement.querySelector('#' + rowData.materialName + idn).value = '';
              },
              (purErr) => {
                this.openSnackBar('進貨失敗');
              }
            );
        }

      } else {
          this.openSnackBar('請輸入數量大於0的數量');
        }



  }
  dateChange(d1, d2, d3) {
    // console.log($event.value._i.year + '-' + ($event.value._i.month +1) + '-' + $event.value._i.date);
    // const getDate = $event.value._i.year + '-' + ($event.value._i.month +1) + '-' + $event.value._i.day;
      // const transDate = parseInt(getDate);
    if (d2 < 10) {
      d2 = 0 + '' + d2;
    }
    if (d3 < 10) {
      d3 = 0 + '' + d3;
    }
      const date = d1 + '' + d2 + '' + d3;
      // console.log(date);

    this.data.getPurchasesDate(date).subscribe(data => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        data[i].purchaseDate = data[i].purchaseDate.replace('T', ' ');
        data[i].purchaseDate = data[i].purchaseDate.replace('.000Z', '');
      }
      this.purchases$ = data;
      });



  }
  openSnackBar(massage) {
    this.snackBar.open(massage, '關閉', {
      duration: 5000,
    });
  }

}
