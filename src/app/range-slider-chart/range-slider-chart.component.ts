
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';

@Component({
  selector: 'app-range-slider-chart',
  templateUrl: './range-slider-chart.component.html',
  styleUrls: ['./range-slider-chart.component.css']
})
export class RangeSliderChartComponent implements OnInit {

// Month
ChartData_M: any = [];
time_M: any  = [];
KVAh_M:any=[];
KVA_M:any=[];
KVAR_M:any=[];
KW_M:any=[]
KVAh_M_Data: any = [];


// Week
ChartData_W: any = [];
time_W: any  = [];
KVAh_W:any=[];
KVA_W:any=[];
KVAR_W:any=[];
KW_W:any=[]
KVAh_W_Data: any = [];


// Day
ChartData_D: any = [];
time_D: any  = [];
KVA_D:any=[];
// KVA_D:any=[];
KVAR_D:any=[];
KW_D:any=[]
KVAh_D_Data: any = [];

// Custom
KVAh_D_Data2: any = [];
startdate:any =[];
enddate:any=[];
indexstartdate:any=[];
indexenddate:any=[];
sort_date:any = [];
sort_date2:any = [];
svalue:any = [];
config:any;
filterDate:any;
filterDatapoints:any;

time_D2: any  = [];

public chart: any;


constructor(public user: ChartdataService) {
  setTimeout(()=>{                           // <<<---using ()=> syntax
    // this.messageSuccess = false;
  }, 30);

}

ngOnInit(): void {
  this.user.allDayData().subscribe(res => {
  this.ChartData_D =res;

  this.getDataForChart();
  this.createChart();
  this.getValue();
});


}

createChart(){

  this.chart = new Chart("canvas", {
    type: 'line',
    data: {
      labels: this.time_D,
      datasets: [
        {
          label: "KVA",
          data: this.KVAh_D_Data,
          backgroundColor: '#00FF33',

        }

      ]
    },
    options: {
      aspectRatio:2
      // maintainAspectRatio: false
      // events: []
    }
    
  });
}
getDataForChart(){

  for(let i=0; i < this.ChartData_D.length ; i++)
  {
    this.KW_D.push(this.ChartData_D[i].KVA); 
    this.time_D.push(this.ChartData_D[i].reading_time);       
  }

  console.log("this is day data",this.KW_D);
  console.log("this is day labels",this.time_D);
}

getValue(){
  var value = (<HTMLInputElement>document.getElementById('range')).value;
  console.log(value);

  this.KVAh_D_Data2 = [...this.KW_D];
  this.time_D2 = [...this.time_D]


  this.filterDate = this.time_D2.slice(0, value)
  this.chart.config.data.labels = this.filterDate;
    
  this.filterDatapoints = this.KVAh_D_Data2.slice(0, value)
    


  console.log(this.filterDatapoints);
  console.log(this.filterDate);
  

  
  this.chart.config.data.datasets[0].data = this.filterDatapoints;
  // this.chart.data.datasets[0].labels = this.filterDate;
  this.chart.update();
  
}


}
