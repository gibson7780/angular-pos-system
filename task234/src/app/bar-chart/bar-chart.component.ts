import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  barTri = false;
  barData: any = [];
  @Input() set bar(data) {

    if (data === true) {
      this.barTri = data;
        setTimeout(() => {
          this.barChart();
        }, 1000);
    }
  }
  @Input() set data(data) {
    console.log(data);
    this.barData = data;

  }
  constructor() { }

  ngOnInit() {


  }

  barChart() {
    // const xScale = d3.scaleOrdinal().rangeRoundBands([0, width], .2);
    // var myData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // var ordinalScale = d3.scaleOrdinal()
                      	 // .domain(myData);
                      	 // .range(['black', '#ccc', '#ccc']);
    // const xAxis = d3.axisBottom().tick(10);

// var myData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//
// var linearScale = d3.scaleLinear()
// 	.domain([0, 11])
// 	.range([0, 600]);
//
// var ordinalScale = d3.scaleOrdinal()
// 	.domain(myData);
// 	// .range(['black', '#ccc', '#ccc']); 設定間格顏色
//
// d3.select('#wrapper')
// 	.selectAll('text')
// 	.data(myData)
// 	.enter()
// 	.append('text')
// 	.attr('x', function(d, i) {
// 		return linearScale(i);
// 	})
// 	.text(function(d) {
// 		return d;
// 	})
// 	.style('fill', function(d) {
// 		return ordinalScale(d);
// 	});

    const rheight = 45;
    // const data = [
    //   [100, 'suger'],
    //   [27, 'milk']
    // ];
    const dataset = [100, 27, 133, 19, 23, 76, 42, 58, 45,66,33];
    // const myData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
// , 'Dec'
      // d3.select('.chart')
      // 	.selectAll('text')
      // 	.data(myData)
      // 	.enter()
      // 	.append('text')
      // 	.text(function(d) {
      // 		return d;
      // 	})
      // 	.style('fill', function(d) {
      // 		return ordinalScale(d);
      // 	});

    const chart = d3.select('.chart')
    	.attr("width", this.barData.length * 150)
    	.attr('height', 500);


    const bar = chart.selectAll("g")
    	.data(this.barData)
    	.enter().append("g");

    bar.append("rect")
        .attr("y", 500)
        .attr("x", function(d, i) {
             i += 1;
             return i * rheight;
        })
        .attr("height", function(d, i) {
             return (d[1] * 3);
        })
        .attr("width", rheight)
        .attr("fill", "#5F4B8B")
    	  .attr("stroke-width", 2)
        .attr('transform', function (d, i) { return 'translate(' + [i * 70, 0] + ')';})
        .transition()
        .duration(1000)
        .attr('y', function(d, i) { return 500 - (d[1] * 3);})
        .ease(d3.easeElastic)
        .delay(function(d, i) { return i * 150});

    bar.append('text')
    	.attr('y', function(d, i) {return 500 - (d[1] * 3) + 21;})
    	.attr("x", function(d, i) {
        i+=1;
        return i * rheight + 22;
      })
    	.style('fill', '#FFF')
    	.style('font-size', '18px')
    	.style("text-anchor", 'middle')
      .attr('transform', function (d, i) { return 'translate(' + [i * 70, 0] + ')';})
    	.text(function(d){
    	return d[1];}
    		 );

    bar.append('text')
    	.attr('y', function(d, i) {return 500 - (d[1] * 3) - 20;})
    	.attr("x", function(d, i) {
        i+= 1;
        return i * rheight + 22;
      })
      .attr('transform', function (d, i) { return 'translate(' + [i * 70, 0] + ')';})
    	.style('fill', '#111')
    	.style('font-size', '18px')
    	.style("text-anchor", 'middle')
    	.text(function(d){
    	return d[0];}
    		 );
    // const mat = chart.selectAll("g")
    // 	.data(myData)
    // 	.enter().append("g");
    //
    // mat.append('text')
    // 	.attr('y', 0)
    // 	.attr("x",function(d,i){
    //          return i * rheight+22;
    //     })
    // 	.style('fill', '#FFF')
    // 	.style('font-size', '18px')
    // 	.style('font-weight', 'bold')
    // 	.style("text-anchor", 'middle')
    // 	.text(function(d){
    // 	return d;}
    // 		 );


  }

}
