import {  AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import * as d3 from 'd3';
@Component({
  selector: 'app-d3-line-chart',
  templateUrl: './d3-line-chart.component.html',
  styleUrls: ['./d3-line-chart.component.css']
})
export class D3LineChartComponent implements OnInit {
col = '2';
a: number ;
b: number ;
y: number ;
c: number ;
p: string ;
d3Data: any = [] ;
changeRange: any = [-10, 10];

  arr = [];
  data = [];
  txt = '';
  result = '';
  total: any = [];
  viewTotal = 0;
  width: string;
  height: string;
  resizeWidth: number ;
  constructor(private breakpointObserver: BreakpointObserver) { }

    ngOnInit() {
    const divWidth = parseInt(d3.select('.svgDiv').style('width'));
      // this.resizeWidth = divWidth;
  // console.log(this.resizeWidth);
          if (divWidth > 400) {
            this.resizeWidth = 400;
          } else if (divWidth < 320){
          this.resizeWidth = 320;
          } else {
          this.resizeWidth = divWidth;
          }
      // console.log(parseInt(this.resizeWidth))

      // console.log(divWidth)
      // console.log(this.resizeWidth)

  // =============取width js方式
      //  function getWidth() {
      //   var divWidth = parseInt(d3.select('.svgDiv').style('width'));
      //   return divWidth;
      // }
      // d3.select(window).on('resize', () => {
      //       this.resize = getWidth();
      //       console.log(this.resize)
      //     });
      // console.log(this);
  // =============


    // d3.select(window).on('resize', recheck );




       this.breakpointObserver.observe('(max-width: 867px)').subscribe(result => {
        console.log(`{Handset: ${result.matches}`);
        if (result.matches === true) {
          // this.col = "1";
          this.width = '80%';
          this.height = 'auto';

        } else {
            this.width = '45%';
            this.height = '445px';
        }
      });
    }// ngOnInit

  onChange(data) {
    this.changeRange = data;
    // console.log(this.changeRange);
    this.onResize();
  }

  // 寬度變更時
    onResize() {
    // event.target.innerWidth;
    // console.log(event.target.innerWidth);
    // console.log(this.resizeWidth);
    var divWidth = parseInt(d3.select('.svgDiv').style('width'), 10);
// console.log(divWidth);
      if (divWidth > 400) {
        this.resizeWidth = 400;
      } else if (divWidth < 320){
      this.resizeWidth = 320;
      } else {
      this.resizeWidth = divWidth;
      }
      // console.log(parseInt(this.resizeWidth));

        this.total = [];
        this.d3Data = [];
        console.log(parseInt(this.changeRange[0], 10));
        console.log(parseInt(this.changeRange[1], 10));
          for ( let x = parseInt(this.changeRange[0], 10); x <= parseInt(this.changeRange[1], 10); x += .5 ) {

            if (isFinite(this.a) && isFinite(this.b) && isFinite(this.c)) {
            this.total.push(this.a * Math.pow( x, 2)  + (this.b * x) + this.c);
            // console.log(this.total);
              this.d3Data.push({'x': x * (this.resizeWidth - 20) / (parseInt(this.changeRange[1], 10) - parseInt(this.changeRange[0], 10)), 'y': -this.total[this.total.length - 1] });
               }
              }
 console.log(this.total);

              // 超過最大值斷點,就會重新計算Y軸一格對應的比例
              if (isFinite(this.a) && isFinite(this.b) && isFinite(this.c)) {

                      if (this.total[0] > 6400 || this.total[this.total.length - 1] > 6400) {
                        for (let i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 25600; // 正負各12800格
                          // console.log(this.d3Data);
                            // console.log(this.d3Data[20].y);
                        }
                      } else if (this.total[0] > 3200 || this.total[this.total.length - 1] > 3200) {
                        for (let i = 0; i < this.d3Data.length; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 12800; // 正負各6400格
                          // console.log(this.d3Data);
                        }
                      } else if (this.total[0] > 1600 || this.total[this.total.length - 1] > 1600) {
                        for (let i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 6400; // 正負各3200格
                          // console.log(this.d3Data);
                        }
                      } else if (this.total[0] > 800 || this.total[this.total.length - 1] > 800) {
                        for (let i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 3200; // 正負各1600格
                          // console.log(this.d3Data);
                        }
                      } else if (this.total[0] > 200 || this.total[this.total.length - 1] > 200) {
                        for (let i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 1600; // 正負各800格
                          // console.log(this.d3Data);
                        }
                      } else {
                          for (let i = 0 ; i < this.d3Data.length ; i++) {
                            console.log(this.resizeWidth)
                            this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 400; // 正負各200格
                            // console.log(this.d3Data);
                            // console.log(this.d3Data[20].y);
                          }
                      }
                 }


  }
    // inputValueChanged() {
    //   console.log('1');
    // }
  // 計算公式
    calculator(val: number, a , id: string) {
  // const divWidth = parseInt(d3.select('.svgDiv').style('width'), 10);
  //   if (divWidth > 320) {
  //     this.resizeWidth = '320';
  //   } else if (divWidth < 240) {
  //       this.resizeWidth = '240';
  //     } else {
  //   this.resizeWidth = String(divWidth);
  //   }
      // console.log(this.resizeWidth);
        this.d3Data = [];
        this.total = [];
        if (isFinite(val)) {
          for ( var x = parseInt(this.changeRange[0], 10); x <= parseInt(this.changeRange[1], 10); x += .5) {
            if (isFinite(this.a) && isFinite(this.b) && isFinite(this.c)) {
            this.total.push(this.a * Math.pow( x, 2)  + (this.b * x) + this.c);
            console.log(x * (this.resizeWidth - 20) / (parseInt(this.changeRange[1], 10) - parseInt(this.changeRange[0], 10)))
              this.d3Data.push({'x': x * (this.resizeWidth - 20) / (parseInt(this.changeRange[1], 10) - parseInt(this.changeRange[0], 10)) , 'y': -this.total[this.total.length - 1] });
               }

              }
              // console.log(this.total);
              // console.log(this.total.length - 1);
              // console.log(this.total[40]);

              // 超過最大值斷點,就會重新計算Y軸一格對應的比例
              if (isFinite(this.a) && isFinite(this.b) && isFinite(this.c)) {
                        // console.log(this.total[0]);
                        // console.log(this.total[this.total.length - 1]);
                      if (this.total[0] > 6400 || this.total[this.total.length - 1] > 6400) {
                        for (var i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 25600; // 正負各12800格
                          // console.log(this.d3Data);
                            // console.log(this.d3Data[20].y);
                        }
                      } else if (this.total[0] > 3200 || this.total[this.total.length - 1] > 3200) {
                        for (var i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 12800; // 正負各6400格
                          // console.log(this.d3Data);
                        }
                      } else if (this.total[0] > 1600 || this.total[this.total.length - 1] > 1600) {
                        for (var i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 6400; // 正負各3200格
                          // console.log(this.d3Data);
                        }
                      } else if (this.total[0] > 800 || this.total[this.total.length - 1] > 800) {
                        for (var i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 3200; // 正負各1600格
                          // console.log(this.d3Data);
                        }
                      } else if (this.total[0] > 200 || this.total[this.total.length - 1] > 200) {
                        for (var i = 0 ; i < this.d3Data.length ; i++) {
                          this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 1600; // 正負各800格
                          // console.log(this.d3Data);
                        }
                      } else {
                          for (var i = 0 ; i < this.d3Data.length ; i++) {
                            this.d3Data[i].y = this.d3Data[i].y * (this.resizeWidth - 20) / 400; // 正負各200格
                            // console.log(this.d3Data);
                            // console.log(this.d3Data[20].y);
                          }
                      }
                 }
          }
          // else {
          //  a.parentNode.parentNode.parentNode.parentNode.parentNode.lastChild.lastChild.innerHTML = val + ' is not a valid input of ' + id;
          //   this.viewTotal = 0;
          // }
      }



  }
