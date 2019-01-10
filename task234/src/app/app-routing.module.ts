import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3SineWaveComponent } from './d3-group/d3-sine-wave/d3-sine-wave.component';
import { D3LineChartComponent } from './d3-group/d3-line-chart/d3-line-chart.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FormulaAndMaterialComponent } from './formula-and-material/formula-and-material.component';
import { PurchaseLogComponent } from './purchase-log/purchase-log.component';

// task3
const routes: Routes = [
  {
    path: '',
    component: PurchaseComponent
  },
  {
      path: 'Purchase/PurchaseLog',
      component: PurchaseLogComponent
  },
  {
    path: 'Shipment',
    component: ShipmentComponent
  },
  {
    path: 'Statistics',
    component: StatisticsComponent
  },
  {
    path: 'FormulaAndMaterial',
    component: FormulaAndMaterialComponent
  }
];







// task-2連結
// const routes: Routes = [
//   {
//     path: '',
//     component: D3LineChartComponent
//   },
//   {
//     path: 'D3SineWave',
//     component: D3SineWaveComponent
//   }
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
