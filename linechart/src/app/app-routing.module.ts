import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3SineWaveComponent } from './d3-group/d3-sine-wave/d3-sine-wave.component';
import { D3LineChartComponent } from './d3-group/d3-line-chart/d3-line-chart.component';


// task-2連結
const routes: Routes = [
  {
    path: '',
    component: D3LineChartComponent
  },
  {
    path: 'D3SineWave',
    component: D3SineWaveComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
