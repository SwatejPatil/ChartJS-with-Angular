import { Component, OnInit } from '@angular/core';
import { ChartapiService } from '../chartapi.service';
// import{Chart} from 'chart.js';
// import { Chart, registerables } from 'chart.js';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-sortday',
  templateUrl: './sortday.component.html',
  styleUrls: ['./sortday.component.css']
})
export class SortdayComponent implements OnInit {

    // DAY
  ChartData_D: any = [];
  time_D: any  = [];
  KVAh_D:any=[];
  KVA_D:any=[];
  KVAR_D:any=[];
  KW_D:any=[];
  KVAh_D_Data: any = [];

  startdate:any =[];
  enddate:any=[];
  indexstartdate:any=[];
  indexenddate:any=[];
  sort_date:any = [];
  sort_date2:any = [];

  svalue:any;

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
    // console.log(this.ChartData_D);
    this.sortday();
    // this.filterData();
    // this.createChart();
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
    this.time_D.shift();
    this.time_D.pop();

    // console.log(this.KVAh_D_Data);
    // console.log(this.KVA_D);
    // console.log(this.KW_D);
    // console.log(this.KVAR_D);
    // console.log(this.time_D)



    this.chart = new Chart("canvas", {
      type: 'bar',
      data: {
        labels: this.sort_date,
        datasets: [
          {
            label: "KVAh_D",
            data: this.KVAh_D_Data,
            backgroundColor: 'rgba(255, 0, 0, 0.7)',

          }

        ]
      },
      options: {
        // events: []
      }
      
    });

    // this.chart2 = new Chart("canvas2", {
    //   type: 'line',
    //   data: {
    //     labels: this.time_D,
    //     datasets: [
    //       {
    //         label: "KVA",
    //         data: this.KVA_D,
    //         backgroundColor: 'rgba(255, 0, 0, 0.7)',
    //         borderColor:'rgba(255, 0, 0, 0.7)',

    //       },
    //       {
    //         label: "KVAR",
    //         data: this.KVAR_D,
    //         backgroundColor: 'rgba(0, 255, 0, 0.7)',
    //         borderColor: 'rgba(0, 255, 0, 0.7)',
    //       },
    //       {
    //         label: "KW",
    //         data: this.KW_D,
    //         backgroundColor: 'rgba(0, 0, 255, 0.7)',
    //         borderColor: 'rgba(0, 0, 255, 0.7)',

    //       }

    //     ]
    //   },
    //   options: {
    //     // events: []
    //   }
      
    // });
    return;
  }

  filterData(){
     this.sort_date2 = [...this.sort_date]
     console.log(this.sort_date2);
  
    this.startdate = document.getElementById('startdate');    
    this.enddate = document.getElementById('enddate');

    console.log(this.startdate.value);
     this.svalue  = this.startdate.value

    this.indexstartdate = this.sort_date2.indexOf(this.svalue);
    this.indexenddate = this.sort_date2.indexOf(this.enddate.value)
    
    
    console.log(this.indexstartdate);

    // var a = [1,2,3,4,5,6,7,8,]
    // var index = a.indexOf(4); 
    // console.log(index);
    

  }

}
