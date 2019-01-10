import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  // data : any = [
  //   {x:10,y:10},
  //   {x:50,y:100},
  //   {x:60,y:50},
  //   {x:100,y:30}
  // ];

  cls = 'line';
  color = 'blue';
  lineData: any[] = [];
  yGap: number;
  width: number;
  lineTri = true;

@Input() set data(data) {
      console.log(data);
          this.lineData = data;
          d3.select('.x').remove();
          d3.select('.y').remove();
          d3.select('.line').remove();
          this.lineChart();
}
@Input() set size(data) {
  console.log(data);
  this.width = data - 100;
  // this.height = data.height; 
  setTimeout(() => {
  d3.select('.x').remove();
  d3.select('.y').remove();
  d3.select('.line').remove();
  this.lineChart();
  }, 200);
}
@Input() set temp(data) {
  // console.log(data);
  this.yGap = data;
  d3.select('.x').remove();
  d3.select('.y').remove();
  d3.select('.line').remove();
  this.lineChart();
}
  constructor() { }

  ngOnInit() {
    // setTimeout(() => {
    // this.lineChart();
    //
    //
    // }, 1000);
  }


  lineChart() {
    // const width = 1000;
    const height = 500;
    const svg = d3.select('#lineSvg').attr('width', this.width).attr('height', height);
    // console.log(svg);
    const xScaleCenter = d3.scaleLinear();
    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();
    const xAxisCallCenter = d3.axisBottom();
    const xAxisCall = d3.axisBottom().ticks(10);
    const yAxisCall = d3.axisLeft().ticks(10);
    setScale2(this.width, this.yGap);
    initAxis();
    function setScale2(reWidth, yGap) {
      // xScaleCenter.domain([1, 10]).range([20, width]);
      xScale.domain([0, 12]).range([20, reWidth - 50]);
      // console.log(yGap);
      if (yGap > 100) {
        yScale.domain([0, 200]).range([height - 20, 20]);
      } else if (yGap > 50) {
        yScale.domain([0, 100]).range([height - 20, 20]);
      } else if (yGap > 20) {
        yScale.domain([0, 50]).range([height - 20, 20]);
      } else if (yGap > 10) {
        yScale.domain([0, 20]).range([height - 20, 20]);
      } else {
        yScale.domain([0, 10]).range([height - 20, 20]);
      }


      xAxisCallCenter.scale(xScaleCenter);
      xAxisCall.scale(xScale);
      yAxisCall.scale(yScale);
    }

    function initAxis() {
      // svg.append('g').attr('class', 'xCenter axis').attr('transform', 'translate(' + [20, height / 2] + ')').call(xAxisCallCenter);
      svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + [20, height - 20] + ')')
      .style('stroke-width', '2px').style('font-size', '16px')
      .call(xAxisCall);

      svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + [40, 0] + ')')
        .style('stroke-width', '2px')
        .style('font-size', '16px')
        .call(yAxisCall);

    }

    const line = d3.line().x(function(d) {
          return d.x;
        }).y(function(d) {
          return d.y;
        });
        // console.log(this.data)
    svg.append('path')
      .attr('class', 'line')
      .attr('d' , line(this.lineData))
      .attr('y', 0)
      .attr('transform', 'translate(' + [40, height - 20] + ')')
      .style( 'stroke', '#f00')
      .style('stroke-width', '6px')
      .style( 'fill', 'none');


  }




}
