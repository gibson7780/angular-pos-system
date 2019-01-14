import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import * as d3 from 'd3';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
@Component({
  selector: 'app-d3-sine-wave',
  templateUrl: './d3-sine-wave.component.html',
  styleUrls: ['./d3-sine-wave.component.css']
})
export class D3SineWaveComponent implements OnInit {
  //   data : any = [
  //   {x:10,y:10},
  //   {x:50,y:100},
  //   {x:60,y:50},
  //   {x:100,y:30}
  // ];
  // null: boolean = false;
  data1: any[] = [];
  data2: any[] = [];
  size: any = {
      width: 1250,
      height: 500
      }
  autoWidth:number = 1200;
onstructor() { }

  ngOnInit() {

    this.planningSineWave();

  }

  planningSineWave() {
  //
    this.data1 = [];
    this.data2 = [];
        const width = this.size.width;
        const height = this.size.height;
        // console.log(height);
        // const n = 10;


        //
        for (let i= 0 ; i < 30 ; i += .1) {
          this.data1.push({'x': i * (width /30), 'y': Math.sin(i) * (height -40) / 2});
          this.data2.push({'x': i * (width / 60)  , 'y': Math.cos(i) * (height -40) / 2});
          // console.log(this.sinData);
        }

  }



  onResize(event) {

    // console.log(this.size.width)
    this.size.width = event.target.innerWidth;
    this.autoWidth = event.target.innerWidth;
    console.log(this.size.width)
    if (this.size.width < 400) {
      this.size.width = 400 ;
    }
    // const svg = d3.select('svg')
                  // .style('width', this.size.width -100 );
    // console.log(svg.style('width'));
    this.planningSineWave();

  }

}
