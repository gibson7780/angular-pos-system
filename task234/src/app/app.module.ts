import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatButtonToggleModule, MatRippleModule, MatInputModule, MatGridListModule, MatCardModule } from '@angular/material';
import { MatTabsModule, MatSnackBarModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule, MatListModule, MatDatepickerModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import * as d3 from 'd3';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroChildComponent } from './hero-child/hero-child.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { D3LineChartComponent } from './d3-group/d3-line-chart/d3-line-chart.component';
import { D3GroupModule } from './d3-group/d3-group.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { UserComponent } from './user/user.component';
import { PosSidebarComponent } from './pos-sidebar/pos-sidebar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FormulaAndMaterialComponent } from './formula-and-material/formula-and-material.component';
import { PurchaseLogComponent } from './purchase-log/purchase-log.component';
import { DialogComponent } from './formula-and-material/dialog/dialog.component';
import { UpdateComponent } from './update/update.component';
import { UpdateDialogComponent } from './formula-and-material/update-dialog/update-dialog.component';
import { AlertBoxComponent } from './formula-and-material/alert-box/alert-box.component';
import { CreateMaterialComponent } from './formula-and-material/create-material/create-material.component';
import { UpdateMaterialComponent } from './formula-and-material/update-material/update-material.component';
import { AlertMaterialComponent } from './formula-and-material/alert-material/alert-material.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';


export const TW_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMM'
  }
};
// import { Observable } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    HeroesComponent,
    HeroChildComponent,
    SidebarComponent,
    PurchaseComponent,
    ShipmentComponent,
    UserComponent,
    PosSidebarComponent,
    StatisticsComponent,
    FormulaAndMaterialComponent,
    PurchaseLogComponent,
    DialogComponent,
    UpdateComponent,
    UpdateDialogComponent,
    AlertBoxComponent,
    CreateMaterialComponent,
    UpdateMaterialComponent,
    AlertMaterialComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
    exports: [
    LayoutModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatSelectModule,
    D3GroupModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'zh-TW'},
              { provide: MAT_DATE_FORMATS, useValue: TW_FORMATS }
            ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    UpdateDialogComponent,
    AlertBoxComponent,
    AlertMaterialComponent,
    UpdateMaterialComponent,
    CreateMaterialComponent
  ]
})
export class AppModule {}
