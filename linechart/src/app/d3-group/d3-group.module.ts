import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatButtonToggleModule, MatRippleModule, MatInputModule, MatGridListModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import * as d3 from 'd3';
// import { Observable } from 'rxjs';
import { D3LineChartComponent } from './d3-line-chart/d3-line-chart.component';
import { D3LinePlanningComponent } from './d3-line-chart/d3-line-planning/d3-line-planning.component';
import { D3SineWaveComponent } from './d3-sine-wave/d3-sine-wave.component';
import { D3SineWavePlanningComponent } from './d3-sine-wave-planning/d3-sine-wave-planning.component';
@NgModule({
  declarations: [D3SineWaveComponent, D3LineChartComponent, D3LinePlanningComponent, D3SineWavePlanningComponent],
  exports: [
  LayoutModule,
  D3LineChartComponent,
  D3SineWaveComponent
],
imports: [
  BrowserModule,
  FormsModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  HttpClientModule,
  MatButtonToggleModule,
  MatRippleModule,
  MatInputModule,
  MatGridListModule,
  MatCardModule,
  LayoutModule,
  MatSelectModule
]
})
export class D3GroupModule { }
