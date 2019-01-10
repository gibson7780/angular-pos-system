import { Component, OnInit, ElementRef } from '@angular/core';
import { DbService } from '../db.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  formulaOptions: any = [];
  usersOptions: any = [];
  formulaNameTri = '';
  lineData: any = [];
  drawData: any = [];
  // size: any = {
    width: number;
    temp: number;
    barDisplay = false;
    lineDisplay = true;
    pieDisplay = false;
  // }
  // test: any[] = [
  //   {x:10,y:10},
  //   {x:50,y:100},
  //   {x:60,y:50},
  //   {x:100,y:30}
  // ];
    // data : any = [
    //   {x:10,y:10},
    //   {x:50,y:100},
    //   {x:60,y:50},
    //   {x:100,y:30}
    // ];
  allMonthTotal: any[] = [];
  total: number;
  dbData: any = [];
  barData: any = [];
  pieData: any = [];
  constructor(private data: DbService, private el: ElementRef) { }

  ngOnInit() {
    // this.pieChart();
    this.barChart();



    setTimeout(() => {
      const titleLabel = this.el.nativeElement.querySelectorAll('.mat-tab-label');

        titleLabel[2].addEventListener('click', () => {
          if (this.barDisplay === false) {
            this.barDisplay = true;
          }
      });
    }, 200);

    setTimeout(() => {
      const titleLabel = this.el.nativeElement.querySelectorAll('.mat-tab-label');

        titleLabel[1].addEventListener('click', () => {
          if (this.pieDisplay === false) {
            this.pieDisplay = true;
          }
      });
    }, 200);

    this.width = window.innerWidth;

    this.data.getFormulas().subscribe(data => {
      console.log(data);

      for (let i = 0; i < data.length; i ++) {
        this.formulaOptions.push(data[i].formulaName);

      }
      // console.log(this.formulaOptions);
    });

    this.data.getUsers().subscribe(data => {
      // console.log(data);

      for (let i = 0; i < data.length; i ++) {
        this.usersOptions.push(data[i].userName);

      }
      // console.log(this.formulaOptions);
    });


  }

  showFormulaChart(formulaName) {
    // console.log(formulaName);
    this.formulaNameTri = formulaName;
    this.data.getFormulaShipment(formulaName).subscribe(
      (data) => {
        // console.log(data);
        this.dbData = data;
        this.autoLine();
      },
      (err) => {

      }
    );
  }

  barChart() {
    this.data.getFormulas().subscribe(forData => {
      // console.log(forData);
      const barContents = [];
        forData.forEach(function(forItem, forIndex) {
          barContents.push([forItem.formulaName, forItem.price - forItem.cost]);
        });
        // console.log(barContents);
        this.barData = barContents;
        // console.log(this.barData);

      });
  }
  showUserChart(name) {
    console.log(name);
    this.data.getUserShipments(name).subscribe(
      (userData) => {
        console.log(userData);
        const arr = [];
        let totalData = [];
        const allTotal = 0;
        if (userData.length === 0) {
          totalData = [0];
          // console.log(totalData);
        } else {
            userData.forEach(function(item, index){
              console.log(arr.indexOf(item.formulaId));
              if (arr.indexOf(item.formulaId) >= 0) {
                totalData[arr.indexOf(item.formulaId)].value += item.total;
                // console.log(totalData);
              } else {
                arr.push(item.formulaId);
                totalData
                totalData.push({'label': item.formulaName, 'value': item.total});


                // console.log(arr);
                // console.log(totalData);

              }

            });

        }
             this.pieData = totalData;
             //  totalData.forEach(function(item) {
             //    if (item.length === 0 ) {
             //      allTotal =  0;
             //    } else {
             //      allTotal +=  item;
             //    }
             //  });
             //  console.log(allTotal);
        // this.data.get
      },
      (userErr) => {

      });
  } // pieChart()


  autoLine() {
    // console.log(this.dbData);
    this.allMonthTotal = [];
    for (let i = 1; i <= 12; i++) {
      this.total = 0;
        for ( let j = 0; j < this.dbData.length; j++) {
          if (parseInt(this.dbData[j].shipmentDate.substr(5, 2), 10) === i) {
            this.total += this.dbData[j].counts;
          }

        }
        this.allMonthTotal.push(this.total);

      // this.allMonthTotal.push(this.total);
      console.log(this.allMonthTotal) ;
    }
    this.lineData = [{'x': 0, 'y': 0}];
    this.temp = 0;
    for (let i = 1; i <= 12; i++) {
      if (this.temp < this.allMonthTotal[i - 1]) {
        this.temp = this.allMonthTotal[i - 1];
        // console.log(this.temp);
      }
    }

    for (let i = 1; i <= 12; i++) {
      if (this.temp > 100) {
        this.lineData.push({'x': i * ((this.width - 170) / 12), 'y': -this.allMonthTotal[i - 1] * (460 / 200)});
      } else if (this.temp > 50) {
        this.lineData.push({'x': i * ((this.width - 170) / 12), 'y': -this.allMonthTotal[i - 1] * (460 / 100)});
      } else if (this.temp > 20) {
        this.lineData.push({'x': i * ((this.width - 170) / 12), 'y': -this.allMonthTotal[i - 1] * (460 / 50)});
      } else if (this.temp > 10) {
        this.lineData.push({'x': i * ((this.width - 170) / 12), 'y': -this.allMonthTotal[i - 1] * (460 / 20)});
      } else {
        this.lineData.push({'x': i * ((this.width - 170) / 12), 'y': -this.allMonthTotal[i - 1] * (460 / 10)});
      }

    }

  }
  onResize(event) {
      this.width = event.target.innerWidth;
      if (this.formulaNameTri !== '') {
        this.autoLine();
      }
    // console.log(event.target.innerWidth);
  }

  // bar

}
