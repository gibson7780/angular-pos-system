import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  pieTri = false;
  pieData = [];
@Input() set data(data) {
  console.log(data);
  this.pieData = data;
  d3.selectAll('.pie').remove();
          // setTimeout(() => {
            this.pieChart();
          // }, 1000);
}
@Input() set pie(data) {
  console.log(data);
  this.pieTri = data;
  // d3.select('.pie').remove();
        // setTimeout(() => {
          // this.pieChart();
        // }, 1000);
  // this.pieChart();
}
  constructor() { }

  ngOnInit() {




  //     g.append("text")
	// .attr("transform", function(d) {
	// 	return "translate(" + labelArc.centroid(d) + ")";
	// })
	// .text(function(d) {
	// 	return d.data;
	// });
  //

  }

  pieChart() {


      const svg = d3.select('.pieSvg')
                  .attr('width', 800)
                  .attr('height', 480)
                  .append('g')
                  .attr('transform', 'translate(250,250)')
                  .attr('class', 'pie');

      // const color = d3.scaleOrdinal()
      //            .range(['#abc5c5', '#89a68a', '#6b5488', '#6a456c']);
      // const dd = [[10, '新竹'], [20, '台北'], [30, '台中'], [40, '苗栗']];
      const color = d3.scaleOrdinal().range(['#abc5c5', '#89a68a', '#6b5488', '#6a456c']);
      const pieData = this.pieData;
         // const pieData = [10, 20 ,30 ,40];
         // console.log(pie(pieData));
      const arc1 = d3.arc()
                 .outerRadius(200)
                 .innerRadius(0);
      const pie = d3.pie()
                  .value(function(d){ return d.value; });
              // console.log(pie(pieData));
      const g1 = svg.selectAll('g')
              .data(pie(pieData))
              .enter()
              .append('g');


            g1.append("path")
              .attr("d", arc1)
              .style("fill", function(d, i) {
                console.log(i);
                return color(i);
              })
              .style('opacity', 0.8)
              .on("mouseover", handleMouseOver)
              .on("mouseout", handleMouseOut);

            g1.append('text')
              .attr("transform", function(d) {
                    //設定文字在各區塊中央
                    return "translate(" + arc1.centroid(d) + ")";
                })
              .style('fill', '#111')
              .style('font-size', '18px')
            	.style("text-anchor", 'middle')
              .text(function(d, i) {return pieData[i].label + ': ' + d.value + '$';});

      function handleMouseOver(e: MouseEvent) {
         // e = window.event;
        const a = this.parentNode.childNodes;
        console.log(e);
        console.log(e.clientX);
        console.log(e.clientY);

        // .attr('trasnform', 'translate(' + [e.clientX, e.clientY] + ')')
        // .attr('left', e.clientX).attr('top', e.clientY)
            d3.select('.rela').append('div').style('position', 'absolute').style('left', 220 +'px').style('top', 20 +'px').style('font-weight', 700).style('font-size', '20px').text( a[1].innerHTML);
            // console.log(this);
            d3.selectAll('path').style('opacity', 0.2);
            d3.select(this).style('opacity', 1);
          }

      function handleMouseOut() {
        d3.select('.rela div').remove();
            d3.selectAll('path').style('opacity', 0.8);

          }

  }

}
