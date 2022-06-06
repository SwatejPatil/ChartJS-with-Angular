import { Component, OnInit } from '@angular/core';
import { ChartapiService } from '../chartapi.service';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';
import { ThisReceiver } from '@angular/compiler';
// import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-filter-date-line',
  templateUrl: './filter-date-line.component.html',
  styleUrls: ['./filter-date-line.component.css']
})
export class FilterDateLineComponent implements OnInit {
    // DAY
    ChartData_D: any = [];
    time_D: any  = [];
    KVAh_D:any=[];
    KVA_D:any=[];
    KVAR_D:any=[];
    KW_D:any=[];
    KVAh_D_Data: any = [];
    KVAh_D_Data2: any = [];

    KVA_D_Data:any=[];
    KVAR_D_Data:any=[];
    KW_D_Data:any=[];

    KVA_D_Data2:any=[];
    KVAR_D_Data2:any=[];
    KW_D_Data2:any=[];

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
    public chart2: any;


    constructor(public user: ChartdataService) {
      setTimeout(()=>{                           // <<<---using ()=> syntax
        // this.messageSuccess = false;
      }, 3000);

    }

    ngOnInit(): void {
      this.user.getDataD().subscribe(res => {
      this.ChartData_D =res;
      this.sortday();
   });
    }

    sortday(){

      for(let i = this.ChartData_D.length - 1 ; i>=1;i--){
        this.KVAh_D.push(this.ChartData_D[i].KVAh_D);
        this.KVA_D.push(this.ChartData_D[i].KVA); 
        this.KVAR_D.push(this.ChartData_D[i].KVAR); 
        this.KW_D.push(this.ChartData_D[i].KW);   
        this.time_D.push(this.ChartData_D[i].reading_time);       
      }
      var length = 10;
      for(var i =0; i<this.time_D.length; i++){
        this.sort_date[i]= this.time_D[i].substring(0, length);
      }
      
      for(let i = this.KVAh_D.length - 1; i>=1;i--){
        this.KVAh_D_Data.push(this.KVAh_D[i] - this.KVAh_D[i+1])
      };
      this.KVAh_D_Data.reverse();
      this.sort_date.reverse();


      this.config = {
        type: 'line',
        data: {
          labels: this.sort_date,
          datasets: [
        {
          label: "KVA",
          data: this.KVA_D,
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          borderColor:'rgba(255, 0, 0, 0.7)',

        },
        {
          label: "KVAR",
          data: this.KVAR_D,
          backgroundColor: 'rgba(0, 255, 0, 0.7)',
          borderColor: 'rgba(0, 255, 0, 0.7)',
        },
        {
          label: "KW",
          data: this.KW_D,
          backgroundColor: 'rgba(0, 0, 255, 0.7)',
          borderColor: 'rgba(0, 0, 255, 0.7)',

        }

      ]
        },
        options: {
          // events: []
        }
        
      }
      this.chart = new Chart("canvas", this.config);

      this.sort_date2.pop();
      this.KVAh_D_Data.pop();
    }

    filterData(){

       this.sort_date2 = [...this.sort_date]
       // console.log(this.sort_date2);
       // console.log(this.KVAh_D_Data);

    
      this.startdate = document.getElementById('startdate');    
      this.enddate = document.getElementById('enddate');


      this.indexstartdate = this.sort_date2.indexOf(this.startdate.value);
      this.indexenddate = this.sort_date2.indexOf(this.enddate.value);
      
      
      // console.log(this.indexstartdate);
      // console.log(this.indexenddate);

      this.filterDate = this.sort_date2.slice(this.indexstartdate, this.indexenddate+1)
      this.chart.config.data.labels = this.filterDate;



      this.KVA_D_Data = [...this.KVA_D]
      this.KVAR_D_Data = [...this.KVAR_D]
      this.KW_D_Data = [...this.KW_D]

      console.log(this.KW_D_Data);


      
      this.KVA_D_Data2 = this.KVA_D_Data.slice(this.indexstartdate, this.indexenddate+1)
      this.KVAR_D_Data2 = this.KVAR_D_Data.slice(this.indexstartdate, this.indexenddate+1)
      this.KW_D_Data2 = this.KW_D_Data.slice(this.indexstartdate, this.indexenddate+1)
      
      this.chart.config.data.datasets[0].data = this.KVA_D_Data2;
      this.chart.config.data.datasets[1].data = this.KVAR_D_Data2;
      this.chart.config.data.datasets[2].data = this.KW_D_Data2;


      this.chart.update();
      

    }
  }

