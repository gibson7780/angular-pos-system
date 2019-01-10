import {  AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import * as d3 from 'd3';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'task234';
  // col = '2';
  // a: number ;
  // b: number ;
  // y: number ;
  // c: number ;
  // p: string ;
  // d3Data: any = [] ;
  // changeRange: any = [-10, 10];
  //   d3Data : any = [
  //   {x:10,y:10},
  //   {x:50,y:100},
  //   {x:60,y:50},
  //   {x:100,y:30}
  // ];

  // arr = [];
  // data = [];
  // txt = '';
  // result = '';
  // total = 0;
  // viewTotal = 0;
  // width: string;
  // height: string;
  // resizeWidth: string ;
  constructor(private breakpointObserver: BreakpointObserver) {}


  ngOnInit() {

  }// ngOnInit

// onChangeRa(data) {
//   this.changeRange = data;
//   console.log(this.changeRange);
//
// }

// 寬度變更時
  // onResize(event) {
  // // event.target.innerWidth;
  // // console.log(event.target.innerWidth);
  // const divWidth = parseInt(d3.select('.svgDiv').style('width'), 10);
  //   if (divWidth > 320) {
  //     this.resizeWidth = '320';
  //   } else if (divWidth < 240) {
  //       this.resizeWidth = '240';
  //     } else {
  //   this.resizeWidth = String(divWidth);
  //   }
  //   // console.log(parseInt(this.resizeWidth));
  // const svgWidth = d3.select('.svgDiv svg').attr('width');
  // // console.log(svgWidth);
  //
  //     this.d3Data = [];
  //     console.log(parseInt(this.changeRange[0], 10));
  //     console.log(parseInt(this.changeRange[1], 10));
  //       for ( let x = parseInt(this.changeRange[0], 10); x <= parseInt(this.changeRange[1], 10); x += .5 ) {
  //
  //         if (isFinite(this.a) && isFinite(this.b) && isFinite(this.c)) {
  //         this.total = this.a * Math.pow( x, 2)  + (this.b * x) + this.c;
  //           this.d3Data.push({'x': x * (parseInt(this.resizeWidth, 10) - 20) / (parseInt(this.changeRange[1], 10) - parseInt(this.changeRange[0], 10)) , 'y': -this.total });
  //            }
  //
  //           }
  //           // 超過最大值斷點,就會重新計算Y軸一格對應的比例
  //           if (isFinite(this.a) && isFinite(this.b) && isFinite(this.c)) {
  //
  //                   if (this.total > 6400) {
  //                     for (let i = 0 ; i < this.d3Data.length ; i++) {
  //                       this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 25600; // 正負各12800格
  //                       console.log(this.d3Data);
  //                         // console.log(this.d3Data[20].y);
  //                     }
  //                   } else if (this.total > 3200) {
  //                     for (let i = 0; i < this.d3Data.length; i++) {
  //                       this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 12800; // 正負各6400格
  //                       console.log(this.d3Data);
  //                     }
  //                   } else if (this.total > 1600) {
  //                     for (let i = 0 ; i < this.d3Data.length ; i++) {
  //                       this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 6400; // 正負各3200格
  //                       console.log(this.d3Data);
  //                     }
  //                   } else if (this.total > 800) {
  //                     for (let i = 0 ; i < this.d3Data.length ; i++) {
  //                       this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 3200; // 正負各1600格
  //                       console.log(this.d3Data);
  //                     }
  //                   } else if (this.total > 200) {
  //                     for (let i = 0 ; i < this.d3Data.length ; i++) {
  //                       this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 1600; // 正負各800格
  //                       console.log(this.d3Data);
  //                     }
  //                   } else {
  //                       for (let i = 0 ; i < this.d3Data.length ; i++) {
  //                         console.log(this.resizeWidth)
  //                         this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 400; // 正負各200格
  //                         console.log(this.d3Data);
  //                         // console.log(this.d3Data[20].y);
  //                       }
  //                   }
  //              }
  //

// }
  // inputValueChanged() {
  //   console.log('1');
  // }
// 計算公式
//   calculator(val: number, a , id: string) {
// const divWidth = parseInt(d3.select('.svgDiv').style('width'), 10);
//   if (divWidth > 320) {
//     this.resizeWidth = '320';
//   } else if (divWidth < 240) {
//       this.resizeWidth = '240';
//     } else {
//   this.resizeWidth = String(divWidth);
//   }
//     console.log(this.resizeWidth);
//       this.d3Data = [];
//       if (isFinite(val)) {
//         for ( var x = parseInt(this.changeRange[0], 10); x <= parseInt(this.changeRange[1], 10); x += .5) {
//           if (isFinite(this.a) && isFinite(this.b) && isFinite(this.c)) {
//           this.total = this.a * Math.pow( x, 2)  + (this.b * x) + this.c;
//             this.d3Data.push({'x': x * (parseInt(this.resizeWidth, 10) - 20) / (parseInt(this.changeRange[1], 10) - parseInt(this.changeRange[0], 10)) , 'y': -this.total });
//              }
//
//             }
            // 超過最大值斷點,就會重新計算Y軸一格對應的比例
        //     if (isFinite(this.a) && isFinite(this.b) && isFinite(this.c)) {
        //
        //             if (this.total > 6400) {
        //               for (var i = 0 ; i < this.d3Data.length ; i++) {
        //                 this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 25600; // 正負各12800格
        //                 console.log(this.d3Data);
        //                   // console.log(this.d3Data[20].y);
        //               }
        //             } else if (this.total > 3200) {
        //               for (var i = 0 ; i < this.d3Data.length ; i++) {
        //                 this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 12800; // 正負各6400格
        //                 console.log(this.d3Data);
        //               }
        //             } else if (this.total > 1600) {
        //               for (var i = 0 ; i < this.d3Data.length ; i++) {
        //                 this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 6400; // 正負各3200格
        //                 console.log(this.d3Data);
        //               }
        //             } else if (this.total > 800) {
        //               for (var i = 0 ; i < this.d3Data.length ; i++) {
        //                 this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 3200; // 正負各1600格
        //                 console.log(this.d3Data);
        //               }
        //             } else if (this.total > 200) {
        //               for (var i = 0 ; i < this.d3Data.length ; i++) {
        //                 this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 1600; // 正負各800格
        //                 console.log(this.d3Data);
        //               }
        //             } else {
        //                 for (var i = 0 ; i < this.d3Data.length ; i++) {
        //                   this.d3Data[i].y = this.d3Data[i].y * (parseInt(this.resizeWidth, 10) - 20) / 400; // 正負各200格
        //                   console.log(this.d3Data);
        //                   // console.log(this.d3Data[20].y);
        //                 }
        //             }
        //        }
        // }
        // else {
        //  a.parentNode.parentNode.parentNode.parentNode.parentNode.lastChild.lastChild.innerHTML = val + ' is not a valid input of ' + id;
        //   this.viewTotal = 0;
        // }
    // }



}
