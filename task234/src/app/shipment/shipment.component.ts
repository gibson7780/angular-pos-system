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
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css'],
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
export class ShipmentComponent implements OnInit {
  emailsDataSource: any = new MatTableDataSource<any>();
  users$: Object;
  shipments$: Object;
  signDate: string;
  // displayedColumns: string[] = ['material', 'name', 'progress', 'color'];
  // dataSource: MatTableDataSource<UserData>;
  // @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public snackBar: MatSnackBar, private data: DbService, private httpClient: HttpClient, private el: ElementRef) {
    // const users = this.data.getUsers().subscribe(
    //   data => users = data;
    // );
    // console.log(users);

  }

  ngOnInit() {


  setTimeout(() => {
    // console.log(this.el.nativeElement.querySelectorAll('.mat-tab-label'));
    const titleLabel = this.el.nativeElement.querySelectorAll('.mat-tab-label');
    titleLabel[1].addEventListener('click', () => {
      this.data.getShipments().subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          data[i].shipmentDate = data[i].shipmentDate.replace('T', ' ');
          data[i].shipmentDate = data[i].shipmentDate.replace('.000Z', '');
        }
       this.shipments$ = data;
          });
        });
    }, 0);


     this.data.getFormulas().subscribe(data => {
      this.emailsDataSource.data = data;
      this.emailsDataSource.paginator = this.paginator;
      this.emailsDataSource.sort = this.sort;
      if (this.emailsDataSource.paginator) {
      this.emailsDataSource.paginator.firstPage();
      }


    });
     this.data.getShipments().subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          data[i].shipmentDate = data[i].shipmentDate.replace('T', ' ');
          data[i].shipmentDate = data[i].shipmentDate.replace('.000Z', '');
        }
        this.shipments$ = data;
    });

  }



  applyFilters(filterValue: string) {
    this.emailsDataSource.filter = filterValue.trim().toLowerCase();
    this.emailsDataSource.filterPredicate = (data: any, filter: string): boolean => {
      return data.formulaName.indexOf(filter) !== -1;
    };

    }

createShipment(rowData, idn) {
  const inputDate = this.el.nativeElement.querySelector('#' + rowData.formulaName + idn).value;
  console.log(inputDate);
  const inputValue = this.el.nativeElement.querySelector('#' + rowData.formulaName).value;
  this.el.nativeElement.querySelector('#' + rowData.formulaName).value = '';

  if (inputValue !== '' && inputValue !== 0) {
      if (inputDate === '') {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const sec = date.getSeconds();
        const mins = date.getMinutes();
        const newDate = year + '-' + month + '-' + day + ' ' + hour + ':' + mins + ':' + sec;
        console.log(newDate);
        const newData = {
                  userId: 1,
                  formulaId: rowData.formulaId,
                  counts: parseInt(inputValue, 10),
                  total: inputValue * rowData.price,
                  shipmentDate: newDate
                };
          this.data.createShipment(newData).subscribe();
          this.openSnackBar('出貨成功');
          this.el.nativeElement.querySelector('#' + rowData.formulaName + idn).value = '';
        } else {
          const newDate = inputDate + ' ' + '00:00:00';
          console.log(newDate);
          const newData = {
                  userId: 1,
                  formulaId: rowData.formulaId,
                  counts: parseInt(inputValue, 10),
                  total: inputValue * rowData.price,
                  shipmentDate: newDate
                };
          this.data.createShipment(newData).subscribe();
          this.openSnackBar('出貨成功');
          this.el.nativeElement.querySelector('#' + rowData.formulaName + idn).value = '';
        }



    } else {
        this.openSnackBar('請輸入數量');
    }


  }
  dateChange(d1, d2, d3) {
    if (d2 < 10) {
      d2 = 0 + '' + d2;
    }
    if (d3 < 10) {
      d3 = 0 + '' + d3;
    }
    // console.log($event.value._i.year + '-' + ($event.value._i.month +1) + '-' + $event.value._i.date);
    // const getDate = $event.value._i.year + '-' + ($event.value._i.month +1) + '-' + $event.value._i.day;
    const date = d1 + '' + d2 + '' + d3;
    // console.log(date)
    this.data.getShipmentsDate(date).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        data[i].shipmentDate = data[i].shipmentDate.replace('T', ' ');
        data[i].shipmentDate = data[i].shipmentDate.replace('.000Z', '');
      }
      this.shipments$ = data;
      // console.log(data)
    });
    }


  openSnackBar(massage) {
    this.snackBar.open(massage, '關閉', {
      duration: 5000,
    });
  }

}

// filter(value) {
//   console.log(value);
//
// }

  // createUser() {
  //            this.data.createUser().subscribe(
  //           data => this.users$ = data)
  // }
//   deleteUser(id) {
//     console.log(id);
//        this.data.deleteUsers(id).subscribe(
//       data => this.users$ = data
//       )
//   }
// }
