import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sort-line',
  templateUrl: './sort-line.component.html',
  styleUrls: ['./sort-line.component.css']
})
export class SortLineComponent implements OnInit {

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
  KVAh_D:any=[];
  KVA_D:any=[];
  KVAR_D:any=[];
  KW_D:any=[]
  KVAh_D_Data: any = [];

  // Custom
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
    KVA_D_Data:any=[];
    KVAR_D_Data:any=[];
    KW_D_Data:any=[];

    KVA_D_Data2:any=[];
    KVAR_D_Data2:any=[];
    KW_D_Data2:any=[];
  
  public chart: any;
  x: any;
  
  
  constructor(public user: ChartdataService, private router: Router) {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
    }, 30);
  
  }
  
  
  ngOnInit(): void {
    this.user.getDataM().subscribe(res => {
    this.ChartData_M =res;
    this.createChart();
    this.getDataForChart();
  });
  this.user.getDataW().subscribe(res => {
    this.ChartData_W =res;
    // this.sortday();
    // this.createChart();
  });
  this.user.getDataD().subscribe(res => {
    this.ChartData_D =res;
    // this.sortday();
    
    // this.createChart();
  });

  
  // this.sortday();
  
  }
  
  createChart(){
  
    this.chart = new Chart("canvasL", {
      type: 'line',
      data: {
        labels: this.time_M,
        datasets: [
          {
            label: "KVA",
            data: this.KVA_M,
            backgroundColor: '#00FF33',
            borderColor: '#00FF33'
  
          },
          {
            label: "KVAR",
            data: this.KVAR_M,
            backgroundColor: '#00C7FF',
            borderColor:'#00C7FF'
  
          },
          {
            label: "KW",
            data: this.KW_M,
            backgroundColor: '#FF8C22',
            borderColor:'#FF8C22'
  
          },
  
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
    this.KVA_D.push(this.ChartData_D[i].KVA); 
    this.KVAR_D.push(this.ChartData_D[i].KVAR); 
    this.KW_D.push(this.ChartData_D[i].KW);     
    this.time_D.push(this.ChartData_D[i].reading_time);        
    }

    this.time_D.shift();
    this.time_D.pop();
  
    // console.log("this is day data",this.KVA_D);
    // console.log("this is day labels",this.time_D);
  
    for(let i = this.ChartData_W.length - 1 ; i>=0;i--){
      this.KVA_W.push(this.ChartData_W[i].KVA); 
    this.KVAR_W.push(this.ChartData_W[i].KVAR); 
    this.KW_W.push(this.ChartData_W[i].KW);     
    this.time_W.push(this.ChartData_W[i].reading_time);      
    }

    this.time_W.pop();
    // console.log("this is week data",this.KVA_W);
    // console.log("this is week labels",this.time_W);
  
  
    for(let i = this.ChartData_M.length - 1 ; i>=0;i--){
    this.KVA_M.push(this.ChartData_M[i].KVA); 
    this.KVAR_M.push(this.ChartData_M[i].KVAR); 
    this.KW_M.push(this.ChartData_M[i].KW);     
    this.time_M.push(this.ChartData_M[i].reading_time);     
    }
    this.time_M.shift();
    this.time_M.pop();
  
    // console.log("this is month data",this.KVA_M);
    // console.log("this is month labels",this.time_M);

    this.time_M.reverse();
    this.time_W.reverse();
    this.time_D.reverse();

    this.KVA_D.reverse();
    this.KVA_M.reverse();
    this.KVA_W.reverse();

    this.KVAR_M.reverse();
    this.KVAR_W.reverse();
    this.KVAR_D.reverse();

    this.KW_D.reverse();
    this.KW_W.reverse();
    this.KW_M.reverse();

    var length = 10;
    for(var i =0; i<this.time_M.length; i++){
      this.sort_date[i]= this.time_M[i].substring(0, length);
    }
  
  
  
  
  }
  sortday(){
  
    this.chart.data.datasets[0].data = this.KVA_D;
    this.chart.data.datasets[1].data = this.KVAR_D;
    this.chart.data.datasets[2].data = this.KW_D;
    this.chart.data.labels = this.time_D;
    this.chart.update();
  }
  
  sortweek(){  
    this.chart.data.datasets[0].data = this.KVA_W;
    this.chart.data.datasets[1].data = this.KVAR_W;
    this.chart.data.datasets[2].data = this.KW_W;
    this.chart.data.labels = this.time_W;
    this.chart.update();
  }
  
  sortmonth(){ 
    this.chart.data.datasets[0].data = this.KVA_M;
    this.chart.data.datasets[1].data = this.KVAR_M;
    this.chart.data.datasets[2].data = this.KW_M;
    this.chart.data.labels = this.time_M;
    this.chart.update();
  }
  filterData(){

    this.sort_date2 = [...this.sort_date]
    console.log(this.sort_date2);
    // console.log(this.KVAh_D_Data);

 
   this.startdate = document.getElementById('startdate');    
   this.enddate = document.getElementById('enddate');


   this.indexstartdate = this.sort_date2.indexOf(this.startdate.value);
   this.indexenddate = this.sort_date2.indexOf(this.enddate.value);
   
   
   console.log(this.indexstartdate);
   console.log(this.indexenddate);

   this.filterDate = this.sort_date2.slice(this.indexstartdate, this.indexenddate+1)
   this.chart.config.data.labels = this.filterDate;


  //  console.log(this.KVA_D);
  //  console.log(this.KVAR_D);
  //  console.log(this.KW_D);

   this.KVA_D_Data = [...this.KVA_M]
   this.KVAR_D_Data = [...this.KVAR_M]
   this.KW_D_Data = [...this.KW_M]

   console.log(this.KVA_D_Data);
   console.log(this.KVAR_D_Data);
   console.log(this.KW_D_Data);


   
   this.KVA_D_Data2 = this.KVA_D_Data.slice(this.indexstartdate , this.indexenddate+1)
   this.KVAR_D_Data2 = this.KVAR_D_Data.slice(this.indexstartdate , this.indexenddate+1)


   this.KW_D_Data2 = this.KW_D_Data.slice(this.indexstartdate , this.indexenddate+1)

   console.log(this.KVA_D_Data2,'ksdlfkhsakdhflasjdhflkaj');
   console.log(this.KVAR_D_Data2,'ksdlfkhsakdhflasjdhflkaj');
   console.log(this.KW_D_Data2,'ksdlfkhsakdhflasjdhflkaj');
   
   this.chart.config.data.datasets[0].data = this.KVA_D_Data2;
   this.chart.config.data.datasets[1].data = this.KVAR_D_Data2;
   this.chart.config.data.datasets[2].data = this.KW_D_Data2;

   this.chart.config.data.labels = this.sort_date2;


   this.chart.update();
   

 }
 sortcustom(){
  
  this.x = document.getElementById("myDIV2");
  if (this.x.style.display === "block") {
    this.x.style.display = "none";
  } else {
    this.x.style.display = "block";
  }
}

redirect() {
  this.router.navigate(['interval']);
}
  
  }
  
  
