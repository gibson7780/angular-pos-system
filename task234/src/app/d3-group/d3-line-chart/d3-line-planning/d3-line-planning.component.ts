import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-d3-line-planning',
  templateUrl: './d3-line-planning.component.html',
  styleUrls: ['./d3-line-planning.component.css']
})
export class D3LinePlanningComponent implements OnInit {
@Output()
onChangeRa = new EventEmitter();


    // XLeftMax: string[] = [
    //   '-11','-12','-13','-14','-15','-16','-17','-18','-19','-20'
    // ];

    XLeftMaxs: string[] = [
      '-11', '-12', '-13', '-14', '-15', '-16', '-17', '-18', '-19', '-20'
    ];
    XRightMaxs: string[] = [
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
    ];
    selectBox: number[] = [-10, 10];
    reD3Width: number = 960;
    reD3Height: number = 960;
    zeroPos: number = 50.5;
  // states: string[] = [
  //   'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  //   'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  //   'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  //   'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  //   'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  //   'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  //   'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  // ];
  tempTotal: any =[0];
  gap: number = 20 ;
  d3PathData: any[];
  color: string = '#000';
  cls: string = '';
  newSize: any;
  newWidth: number;
  bl: number = 0;
  @Input() set autoWidth(data) {
    console.log(data);
    this.reD3Width = data - 100;
    console.log(this.reD3Width);

    this.rePlanning();
  }
@Input() set size(data) {

  this.newSize = data;
  this.reD3Width = this.newSize.width;

  // console.log(this.newSize.width)
  // console.log(this.zeroPos)

  this.rePlanning();

};
// @Input() set adata(data) {
//   console.log(data)
//   if(data != null) {
//
//             d3.select('.outstyle').remove();
//             d3.selectAll('.mat-form-field-infix').remove();
//               // this.sin = data;
//               this.cls = 'sin';
//               this.color = '#00f';
//               d3.select('.sin').remove();
//             const svg = d3.select('#example1')
//                         .attr('width', this.reD3Width)
//                         .attr('height', 500);
//                         // console.log(this.zeroPos);
//               // this.planningSineWave(data);
//                 // this.getPos();
//                 // console.log(this.zeroPos);
//               this.rePlanning();
//               this.creatLine(data, this.reD3Width, this.zeroPos);
//
//   }
//
//
//
//   };
// @Input() set cosData(data) {
//   //
//   d3.select('.outstyle').remove();
//   d3.selectAll('.mat-form-field-infix').remove();
//     // this.sin = data;
//     this.cls = 'cos';
//     this.color = '#f00';
//     d3.select('.cos').remove();
//   const svg = d3.select('#example1')
//               .attr('width', this.reD3Width)
//               .attr('height', 500);
//     // this.planningSineWave(data);
//     this.getPos();
//     this.rePlanning();
//     this.creatLine(data, this.reD3Width, this.zeroPos);
//   };
@Input()
set resizeWidth(reDivWidth) {
this.reD3Width = parseInt(reDivWidth, 10);
// console.log(this.reD3Width)
// replanning(this.tempTotal, this.gap);
}
@Input()
set total(data) {
  // console.log(data)
  this.tempTotal = data;
  this.rePlanning();
}

@Input()
  set data(data) {
    console.log(data);
    if (data.length > 0 && this.bl === 0 && this.tempTotal[0] === 0) {
        this.bl = 1;
      this.selectBox[0] = data[0].x;
      this.selectBox[1] = data[data.length - 1].x;
          d3.select('.outstyle').remove();
          d3.selectAll('.mat-form-field-infix').remove();

    }
// console.log(data.length)
    d3.select('.path').remove();
    this.cls = 'path';
      // if (this.reD3Width > 400) {
      //   this.reD3Width = 400;
      // } else if (this.reD3Width < 320) {
      //   this.reD3Width = 320;
      // }
      // this.selectBox[0] = data[0].x;
      // this.selectBox[1] = data[data.length - 1].x;
      // console.log(data)
        // console.log(data[data.length - 1].x)

    this.d3PathData = data;
    this.rePlanning();
    this.getPos();
    this.rePlanning();
    this.creatLine(this.d3PathData, this.reD3Width, this.zeroPos);

  // this.rePlanning();


 } // input set

constructor() { }





  ngOnInit() {
    this.getPos();
    this.rePlanning();
// var divWidth = parseInt(d3.select('.svgDiv').style('width'));
// var divHeight = parseInt(d3.select('.svgDiv').style('height'));
// console.log(divWidth);
// console.log(divHeight);
//     var svg = d3.select("#example1")
//                 .attr('width', divWidth)
//                 .attr('height', divWidth)
// var width = document.querySelector("svg").clientWidth
// var height = document.querySelector("svg").clientHeight
// var margin = {top:50, left:50, bottom:50, right:50 }
// console.log(width)


// axisUpdateExample1()
// function axisUpdateExample1() {


    // var xScale = d3.scaleLinear()
    // var yScale = d3.scaleLinear()
    // var xAxisCall = d3.axisBottom().ticks(20)
    // var yAxisCall = d3.axisLeft().ticks(20)
    //
    // setScale2()
    // initAxis()

    // function setScale2(){
    //     xScale.domain([-10, 10]).range([10, divWidth-10])
    //     xAxisCall.scale(xScale)
    //     yScale.domain([-200, 200]).range([divWidth-10, 10])
    //     yAxisCall.scale(yScale)
    // }


    // function initAxis() {
    //     svg.append("g")
    //         .attr("class", "x axis")
    //         .attr("transform", "translate("+[0, (divWidth/2)]+")")
    //         .call(xAxisCall)
    //
    //       svg.append("g")
    //           .attr("class", "y axis")
    //           .attr("transform", "translate("+[(divWidth/2), 0]+")")
    //           .call(yAxisCall)
    // }
  // }// axisUpdateExample1


 } // OnInit


 onChangeValue() {
     this.onChangeRa.emit(this.selectBox);

 }

rePlanning() {
// this.getPos();

  // this.tempTotal, this.gap
  d3.select('.y').remove();
  d3.select('.x').remove();
  // var divWidth = parseInt(d3.select('.svgDiv').style('width'));
  // console.log(divWidth);
  // console.log(this.reD3Width);
  //  divWidth = this.reD3Width || divWidth;
// console.log(this.reD3Width);
  // if (this.reD3Width > 400) {
  //   this.reD3Width = 400;
  // } else if (this.reD3Width < 320) {
  //   this.reD3Width = 320;
  // }

  // var width = document.querySelector("svg").clientWidth
  // var height = document.querySelector("svg").clientHeight
  // var margin = {top:50, left:50, bottom:50, right:50 }
  // console.log(this.tempTotal);
  axisUpdateExample1(this.tempTotal, this.gap , this.reD3Width, this.selectBox, this.zeroPos);
  function axisUpdateExample1(tempTotal, gap, reD3Width, range, zeroPos) {
    // console.log(range);


      function trig() {
        if (tempTotal[0] === 0) {
          return 500;
        } else {
          return reD3Width;
        }
      }
          const svg = d3.select('#example1')
                  .attr('width', reD3Width)
                  .attr('height', trig());


      const xScale = d3.scaleLinear();
      const yScale = d3.scaleLinear();
      const xAxisCall = d3.axisBottom().ticks(10);
      const yAxisCall = d3.axisLeft().ticks(10);

setScale2(tempTotal, reD3Width, range);

    // const posY = setScale2(tempTotal, reD3Width, range, zeroPos);
      // console.log(posY);
      initAxis(gap, reD3Width, zeroPos, tempTotal);


      function setScale2(total, reWidth, xAxisRange) {

        console.log(xAxisRange);

              if(total[0] === 0) {
                //sin wave xgrid
                  xScale.domain([xAxisRange[0], xAxisRange[1]]).range([50, reWidth - 10]);
              } else {
                //line xgrid
                  xScale.domain([xAxisRange[0], xAxisRange[1]]).range([10, reWidth - 10]);
              }
// this.total[0] || this.total[this.total.length]
// console.log(tempTotal[0], tempTotal[tempTotal.length - 1]);
        // console.log(total);
      if(total[0] === 0) {
        //sin wave ygrid
          yScale.domain([-1, 1]).range([470, 10]);
      } else {
        //line ygrid
          if (total[0] > 6400 || total[total.length - 1] > 6400) {
              yScale.domain([-12800, 12800]).range([reWidth - 10, 10]);
          } else if (total[0] > 3200 || total[total.length - 1] > 3200) {
              yScale.domain([-6400, 6400]).range([reWidth - 10, 10]);
          } else if (total[0] > 1600 || total[total.length - 1] > 1600) {
              yScale.domain([-3200, 3200]).range([reWidth - 10, 10]);
          } else if (total[0] > 800 || total[total.length - 1] > 800) {
              yScale.domain([-1600, 1600]).range([reWidth - 10, 10]);
          } else if (total[0] > 200 || total[total.length - 1] > 200) {
            yScale.domain([-800, 800]).range([reWidth - 10, 10]);
          } else {
            yScale.domain([-200, 200]).range([reWidth - 10, 10]);
          }

      }


          xAxisCall.scale(xScale);
          yAxisCall.scale(yScale);

      } // setScale2

      function initAxis(xGap, reWidth, posY, totalTri) {
// console.log(totalTri);
          if( totalTri[0] === 0) {
            svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(' + [0, 470] + ')')
              .call(xAxisCall);

            svg.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + [posY, 0] + ')')
                .call(yAxisCall);



          } else {


            svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(' + [0, (reWidth / 2)] + ')')
              .call(xAxisCall);
              svg.append('g')
              .attr('class', 'y axis')
              .attr('transform', 'translate(' + [posY, 0] + ')')
              .call(yAxisCall);
          }




      }
  }
}





getXRightValue(data) {
  this.selectBox[1] = data || 10;
  this.selectBox[0] = this.selectBox[0] || -10;
  this.gap = this.selectBox[1] - this.selectBox[0];
  // console.log(this.selectBox[1]);
  // console.log(this.selectBox);
  // console.log(this.gap);
  // replanning(this.tempTotal,this.gap);
this.onChangeRa.emit(this.selectBox);
  this.rePlanning();
  this.getPos();
  this.rePlanning();
  this.creatLine(this.d3PathData, this.reD3Width, this.zeroPos);

}
getXLeftValue(data) {
  this.selectBox[0] = data || -10;
  this.selectBox[1] = this.selectBox[1] || 10;
  this.gap = this.selectBox[1] - this.selectBox[0];
  // console.log(this.selectBox[0]);
  // console.log(this.selectBox);
  // console.log(this.gap);
this.onChangeRa.emit(this.selectBox);
  // replanning(this.tempTotal,this.gap);

  this.rePlanning();
  this.getPos();
  this.rePlanning();
  this.creatLine(this.d3PathData, this.reD3Width, this.zeroPos);
}

getPos() {
  const zero = document.querySelectorAll('.x .tick');

    // console.log(zero[0],zero[1]);
    for (let i = 0; i< zero.length; i++) {
          const val = zero[i].querySelector('text');

      if (val.innerHTML === '0' ) {
                // console.log(zero[i]);
                  const style = window.getComputedStyle(zero[i]);
                  const matrix = new WebKitCSSMatrix(style.webkitTransform);
                  // console.log('translateX: ', matrix.m41);
                  this.zeroPos = matrix.m41;
                  // console.log(this.zeroPos);
    }

  }
}
     creatLine(d3Data, reD3Width, zeroPos) {
// console.log(d3Data);
// console.log(reD3Width);
// console.log(zeroPos);
         // d3.select('.path').remove();
       const svg = d3.select('#example1');
                   // .attr('class', this.cls)
                   // .attr('width', reD3Width)
                   // .attr('height', reD3Width);

          d3.select('.path').remove();
               const line = d3.line()
               .x(function(d) {
                 return d.x;
               }).y(function(d) {
                 return d.y;
               });

               function tri(tempTotal, reD3Width){
                 if( tempTotal[0] === 0) {
                    return 240;

                 } else {
                   return reD3Width / 2;
                 }
               }
               console.log(zeroPos)
               svg.append('g').append('path')
               .attr('d' , line(d3Data))
               .attr('class', this.cls)
               .attr('y', 0)
               .attr('transform', 'translate(' + [zeroPos, tri(this.tempTotal, reD3Width)] + ')')
               .style( 'stroke', this.color)
               .style('stroke-width', '1px')
               .style( 'fill', 'none');

               // svg.exit().remove();

    }
// x軸更新
// replanningX(data) {
//       d3.select('.x').remove();
//
//     replanning(data);
//       console.log(data);
//       function replanning(data) {
//               var divWidth = parseInt(d3.select('.svgDiv').style('width'));
//                         if(divWidth > 320) {
//                           divWidth = 320;
//                         }
//               // var width = document.querySelector("svg").clientWidth
//               var height = document.querySelector("svg").clientHeight
//               var margin = {top:50, left:50, bottom:50, right:50 }
//
//               axisUpdateExample1()
//               function axisUpdateExample1() {
//                   var svg = d3.select("#example1")
//                               .attr('width', divWidth)
//                               .attr('height', divWidth)
//                   var xScale = d3.scaleLinear()
//                   var xAxisCall = d3.axisBottom().ticks(20)
//
//                   setScale2()
//                   initAxis()
//
//                   function setScale2(){
//                             xScale.domain([data[0], data[1]]).range([10, width-10])
//                             xAxisCall.scale(xScale)
//                   }//setScale2
//                   function initAxis() {
//                       svg.append("g")
//                           .attr("class", "x axis")
//                           .attr("transform", "translate("+[0, (height/2)]+")")
//                           .call(xAxisCall)
//                   }
//               }
//           } // replanning
//
//     } // replanningX


  // function replanning(data, gap) {
  //         d3.select('.y').remove();
  //         d3.select('.x').remove();
  //         var divWidth = parseInt(d3.select('.svgDiv').style('width'));
  //         if(divWidth > 400) {
  //           divWidth = 400;
  //         }
  //
  //         var width = document.querySelector("svg").clientWidth
  //         var height = document.querySelector("svg").clientHeight
  //         var margin = {top:50, left:50, bottom:50, right:50 }
  //
  //         axisUpdateExample1(gap)
  //         function axisUpdateExample1(gap) {
  //             var svg = d3.select("#example1")
  //                         .attr('width', divWidth)
  //                         .attr('height', divWidth)
  //             var xScale = d3.scaleLinear()
  //             var yScale = d3.scaleLinear()
  //             var xAxisCall = d3.axisBottom().ticks(20)
  //             var yAxisCall = d3.axisLeft().ticks(20)
  //
  //             setScale2()
  //             initAxis(gap)
  //
  //             function setScale2(){
  //
  //               xScale.domain([-10, 10]).range([10, divWidth-10])
  //
  //               if(data>6400){
  //                   yScale.domain([-12800, 12800]).range([divWidth-10, 10])
  //               }
  //               else if(data>3200){
  //                   yScale.domain([-6400, 6400]).range([divWidth-10, 10])
  //               }
  //               else if(data>1600){
  //                   yScale.domain([-3200, 3200]).range([divWidth-10, 10])
  //               }
  //               else if(data>800){
  //                   yScale.domain([-1600, 1600]).range([divWidth-10, 10])
  //               }
  //               else if(data>200){
  //                 yScale.domain([-800, 800]).range([divWidth-10, 10])
  //               }
  //               else {
  //                 yScale.domain([-200, 200]).range([divWidth-10, 10])
  //               }
  //
  //                 xAxisCall.scale(xScale)
  //                 yAxisCall.scale(yScale)
  //             }//setScale2
  //             function initAxis(gap) {
  //               console.log(gap);
  //
  //                   svg.append("g")
  //                       .attr("class", "x axis")
  //                       .attr("transform", "translate("+[0, (divWidth/2)]+")")
  //                       .call(xAxisCall)
  //
  //                 svg.append("g")
  //                     .attr("class", "y axis")
  //                     .attr("transform", "translate("+[divWidth/2, 0]+")")
  //                     .call(yAxisCall)
  //             }
  //         }
  //     } // replanning
// d3.select(window).on('resize', replanning);
} // export class D3Component implements OnInit
