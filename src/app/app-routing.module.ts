import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortmonthComponent } from './sortmonth/sortmonth.component';
import { SortweekComponent } from './sortweek/sortweek.component';
import { SortdayComponent } from './sortday/sortday.component';
import { FilterDateBarComponent } from './filter-date-bar/filter-date-bar.component';
import { FilterDateLineComponent } from './filter-date-line/filter-date-line.component';
import { AlldayComponent } from './allday/allday.component';
import { AllmonthComponent } from './allmonth/allmonth.component';
import { IntervalChartComponent } from './interval-chart/interval-chart.component';

const routes: Routes = [
  {path: 'sort-month', component: SortmonthComponent},
  {path: 'sort-week', component: SortweekComponent},
  {path: 'sort-day', component: SortdayComponent},
  // {path: '**', component: SortdayComponent},


  {path: 'filter-bar', component: FilterDateBarComponent},
  {path: 'filter-line', component: FilterDateLineComponent},

  {path: 'allday', component: AlldayComponent},
  {path: 'allmonth', component: AllmonthComponent},
  {path: 'interval', component: IntervalChartComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
