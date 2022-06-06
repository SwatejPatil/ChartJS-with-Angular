
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.css']
})
export class SortBarComponent implements OnInit {

  x:any;
// Month
ChartData_M: any = [];
time_M: any  = [];
KVAh_M:any=[];
KVA_M:any=[];
KVAR_M:any=[];
KW_M:any=[]
KVAh_M_Data: any = [];

KWH_M_Data: any = [];
KVARH_lag_M_Data: any = [];
KVARH_lead_M_Data: any = [];


// Week
ChartData_W: any = [];
time_W: any  = [];
KVAh_W:any=[];
KVA_W:any=[];
KVAR_W:any=[];
KW_W:any=[]
KVAh_W_Data: any = [];

KWH_W_Data: any = [];
KVARH_lag_W_Data: any = [];
KVARH_lead_W_Data: any = [];


// Day
ChartData_D: any = [];
time_D: any  = [];
KVAh_D:any=[];
KVA_D:any=[];
KVAR_D:any=[];
KW_D:any=[]
KVAh_D_Data: any = [];

KWH_D_Data: any = [];
KVARH_lag_D_Data: any = [];
KVARH_lead_D_Data: any = [];

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

public chart: any;


constructor(public user: ChartdataService) {
  setTimeout(()=>{                           // <<<---using ()=> syntax
    // this.messageSuccess = false;
  }, 30);

}

ngOnInit(): void {
  this.user.getDataM().subscribe(res => {
  this.ChartData_M =res;
  
  this.getDataForChart();
  this.createChart();
  
  // this.createChart();
});
this.user.getDataW().subscribe(res => {
  this.ChartData_W =res;
  // this.sortday();
  // this.createChart();
});
this.user.getDataD().subscribe(res => {
  this.ChartData_D =res;
  this.sortday();
  // this.createChart();
});
// this.sortday();

}

createChart(){

  this.chart = new Chart("canvas", {
    type: 'bar',
    data: {
      labels: this.time_M,
      datasets: [
        {
          label: "KVAh_D",
          data: this.KVAh_M_Data,
          backgroundColor: '#00FF33',

        },
        {
          label: "KWH",
          data: this.KWH_M_Data,
          backgroundColor: 'blue',

        },
        {
          label: "KVARH_lag",
          data: this.KVARH_lag_M_Data,
          backgroundColor: 'purple',

        },
        {
          label: "KVARH_lead",
          data: this.KVARH_lead_M_Data,
          backgroundColor: 'red',

        }

      ]
    },
    options: {
      aspectRatio:2.5

      // maintainAspectRatio: false
      // events: []
    }
    
  });
}
getDataForChart(){

  for(let i = this.ChartData_D.length - 1 ; i>=0;i--){
    this.KVAh_D.push(this.ChartData_D[i].KVAh_D); 
    this.time_D.push(this.ChartData_D[i].reading_time);
    this.KVARH_lag_D_Data.push(this.ChartData_D[i].KVARh_D);
    this.KVARH_lead_D_Data.push(this.ChartData_D[i].KVARh_R); 
    this.KWH_D_Data.push(this.ChartData_D[i].KWh_D);  
  }
  
  

  for(let i = this.KVAh_D.length - 1; i>=0;i--){
    this.KVAh_D_Data.push(this.KVAh_D[i] - this.KVAh_D[i+1])
  };

  this.KVAh_D_Data.reverse();
  this.time_D.reverse();
  this.time_D.shift();
  this.time_D.pop();

  console.log("this is day data",this.KVAh_D_Data);
  console.log("this is day labels",this.time_D);

  for(let i = this.ChartData_W.length - 1 ; i>=0;i--){
    this.KVAh_W.push(this.ChartData_W[i].KVAh_D);
    this.time_W.push(this.ChartData_W[i].reading_time);
    this.KVARH_lag_W_Data.push(this.ChartData_W[i].KVARh_D);
    this.KVARH_lead_W_Data.push(this.ChartData_W[i].KVARh_R); 
    this.KWH_W_Data.push(this.ChartData_W[i].KWh_D); 
           
  }

  for(let i = this.KVAh_W.length - 1; i>=0;i--){
    this.KVAh_W_Data.push(this.KVAh_W[i] - this.KVAh_W[i+1])
  };

  this.KVAh_W_Data.reverse();
  this.time_W.reverse();
  // this.time_W.shift();
  this.time_W.pop();
  console.log("this is week data",this.KVAh_W_Data);
  console.log("this is week labels",this.time_W);


  for(let i = this.ChartData_M.length - 1 ; i>=0;i--){
    this.KVAh_M.push(this.ChartData_M[i].KVAh_D);
    this.time_M.push(this.ChartData_M[i].reading_time);
    this.KVARH_lag_M_Data.push(this.ChartData_M[i].KVARh_D);
    this.KVARH_lead_M_Data.push(this.ChartData_M[i].KVARh_R); 
    this.KWH_M_Data.push(this.ChartData_M[i].KWh_D);         
  }

  console.log(this.ChartData_M, "look here");
  console.log(this.KWH_M_Data, "look here");
  console.log(this.KVARH_lag_M_Data, "look here");
  console.log(this.KVARH_lead_M_Data, "look here");

  for(let i = this.KVAh_M.length - 1; i>=0;i--){
    this.KVAh_M_Data.push(this.KVAh_M[i] - this.KVAh_M[i+1])
  };

  this.KVAh_M_Data.reverse();
  this.time_M.reverse();
  this.time_M.shift();
  this.time_M.pop();

  console.log("this is month data",this.KVAh_M_Data);
  console.log("this is month labels",this.time_M);

  var length = 10;
    for(var i =0; i<this.time_M.length; i++){
      this.sort_date[i]= this.time_M[i].substring(0, length);
    }




}
sortday(){

  this.chart.data.datasets[0].data = this.KVAh_D_Data;
  this.chart.data.labels = this.time_D;
  this.chart.update();
}

sortweek(){  
  this.chart.data.datasets[0].data = this.KVAh_W_Data;
  this.chart.data.labels = this.time_W;
  // this.chart.data.datasets:background = this.time_W;
  this.chart.update();
}

sortmonth(){ 
  this.chart.data.datasets[0].data = this.KVAh_M_Data;
  this.chart.data.labels = this.time_M;
  this.chart.update();
}

  filterData(){

     this.sort_date2 = [...this.sort_date]
     console.log(this.sort_date2);
     console.log(this.KVAh_D_Data);

  
    this.startdate = document.getElementById('startdate');    
    this.enddate = document.getElementById('enddate');


    this.indexstartdate = this.sort_date2.indexOf(this.startdate.value);
    this.indexenddate = this.sort_date2.indexOf(this.enddate.value);
    
    
    console.log(this.indexstartdate);
    console.log(this.indexenddate);

    this.filterDate = this.sort_date2.slice(this.indexstartdate, this.indexenddate+1)
    this.chart.config.data.labels = this.filterDate;
    
    this.KVAh_D_Data2 = [...this.KVAh_M_Data]
    this.filterDatapoints = this.KVAh_D_Data2.slice(this.indexstartdate, this.indexenddate+1)

    
    this.chart.config.data.datasets[0].data = this.filterDatapoints;


    this.chart.update();

    // var a = [-1,-2,-3,-4,-5];
    // var b = a.map( s => Math.abs(s));
    

  }

  sortcustom(){
  
    this.x = document.getElementById("myDIV");
    if (this.x.style.display === "block") {
      this.x.style.display = "none";
    } else {
      this.x.style.display = "block";
    }
  }

}


