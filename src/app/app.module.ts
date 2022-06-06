import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SortmonthComponent } from './sortmonth/sortmonth.component';
import { SortweekComponent } from './sortweek/sortweek.component';
import { SortdayComponent } from './sortday/sortday.component';

import { HttpClientModule } from '@angular/common/http';
import { FilterDateBarComponent } from './filter-date-bar/filter-date-bar.component';
import { FilterDateLineComponent } from './filter-date-line/filter-date-line.component';
import { AlldayComponent } from './allday/allday.component';
import { AllmonthComponent } from './allmonth/allmonth.component';
import { LineWithMeterComponent } from './line-with-meter/line-with-meter.component';
import { SortBarComponent } from './sort-bar/sort-bar.component';
import { SortLineComponent } from './sort-line/sort-line.component';
import { RangeSliderChartComponent } from './range-slider-chart/range-slider-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { IntervalChartComponent } from './interval-chart/interval-chart.component';
import { GaugeComponent } from './gauge/gauge.component';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SortmonthComponent,
    SortweekComponent,
    SortdayComponent,
    FilterDateBarComponent,
    FilterDateLineComponent,
    AlldayComponent,
    AllmonthComponent,
    LineWithMeterComponent,
    SortBarComponent,
    SortLineComponent,
    RangeSliderChartComponent,
    PieChartComponent,
    IntervalChartComponent,
    GaugeComponent,
    DynamicChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
