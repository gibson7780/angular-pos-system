import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-d3-sine-wave-planning',
  templateUrl: './d3-sine-wave-planning.component.html',
  styleUrls: ['./d3-sine-wave-planning.component.css']
})
export class D3SineWavePlanningComponent implements OnInit {
  sin: any[] =[];
  cos: any[] =[];
  cls:string;
  color:string;
  // @Input() cosData;
  @Input() size;

  @Input() set sinData(data) {
    this.sin = data;
    this.cls = 'sin';
    this.color = '#00f';
    d3.select('.sin').remove();
    this.planningSineWave(data);
  };
  @Input() set cosData(data) {
    this.sin = data;
    this.cls = 'cos';
    this.color = '#f00';
    d3.select('.cos').remove();
    this.planningSineWave(data);
  };
  constructor() { }

  ngOnInit() { }


    planningSineWave(data) {

          d3.selectAll('.axis').remove();

          const width = this.size.width;
          const height = this.size.height;
          const svg = d3.select('svg').attr('width', width).attr('height', height);
          // console.log(height);
          // const n = 10;



          const xScaleCenter = d3.scaleLinear();
          const xScale = d3.scaleLinear();
          const yScale = d3.scaleLinear();
          const xAxisCallCenter = d3.axisBottom();
          const xAxisCall = d3.axisBottom().ticks(10);
          const yAxisCall = d3.axisLeft().ticks(10);
          setScale2();
          initAxis();

      function setScale2() {
        xScaleCenter.domain([1, 10]).range([20, width - 150]);
        xScale.domain([1, 10]).range([20, width - 150]);
        yScale.domain([-1, 1]).range([height - 20, 20]);
        xAxisCallCenter.scale(xScaleCenter);
        xAxisCall.scale(xScale);
        yAxisCall.scale(yScale);
        }
      function initAxis() {
        svg.append('g')
          .attr('class', 'xCenter axis')
          .attr('transform', 'translate(' + [20, height / 2] + ')')
          .call(xAxisCallCenter);
        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(' + [20, height-20] + ')')
          .call(xAxisCall);

        svg.append('g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + [40, 0] + ')')
          .call(yAxisCall);

          }


        const line = d3.line()
          .x(function(d) {
              return d.x;
            }).y(function(d) {
              return d.y;
            });

        svg.append('g')
          .append('path')
          .attr('class', this.cls)
          .attr('d' , line(data))
          .attr('y', 0)
          .attr('transform', 'translate(' + [40, height / 2] + ')')
          .style( 'stroke', this.color)
          .style('stroke-width', '2px')
          .style( 'fill', 'none');

    }

}
