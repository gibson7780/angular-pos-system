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
    SidebarComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {}
