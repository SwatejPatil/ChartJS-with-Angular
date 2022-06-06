import { Component, OnInit } from '@angular/core';
import { ChartapiService } from '../chartapi.service';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';

@Component({
  selector: 'app-line-with-meter',
  templateUrl: './line-with-meter.component.html',
  styleUrls: ['./line-with-meter.component.css']
})
export class LineWithMeterComponent implements OnInit {
  // Meter 1
  ChartData1:any = [];
  KVAh1: any = [];
  KVA1: any = [];
  KVAR1: any = [];
  KW1: any = [];
  time1: any = [];

  // Meter 2
  ChartData2:any = [];
  KVAh2: any = [];
  KVA2: any = [];
  KVAR2: any = [];
  KW2: any = [];
  time2: any = [];



  chart:any;

  constructor(public user: ChartdataService) {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
    }, 100);

  }

  ngOnInit(): void {
    this.user.getDataM().subscribe(res => {
    this.ChartData1 =res;
    this.getDataFromAllMeters();
    this.makeChart();
    });

    this.user.getDataM2().subscribe(res => {
      this.ChartData2 =res;
      console.log(this.ChartData2);
      // this.sortday();
      
      });

  }


  getDataFromAllMeters(){
    for(let i = this.ChartData1.length - 1 ; i>=1;i--){
      // this.KVAh1.push(this.ChartData1[i].KVAh_D);
      this.KVA1.push(this.ChartData1[i].KVA); 
      this.KVAR1.push(this.ChartData1[i].KVAR); 
      this.KW1.push(this.ChartData1[i].KW);     
      this.time1.push(this.ChartData1[i].reading_time);       
    }
  
    this.time1.reverse();
    this.time1.shift();
    this.time1.pop();
  
    // console.log(this.KVAh_W_Data);
    // console.log(this.time1)

    for(let i = this.ChartData2.length - 1 ; i>=1;i--){
      // this.KVAh1.push(this.ChartData2[i].KVAh_D);
      this.KVA2.push(this.ChartData2[i].KVA); 
      this.KVAR2.push(this.ChartData2[i].KVAR); 
      this.KW2.push(this.ChartData2[i].KW);     
      this.time2.push(this.ChartData2[i].reading_time);       
    }
  
    this.time2.reverse();
    this.time2.shift();
    this.time2.pop();
  
    console.log(this.ChartData2);
    // console.log(this.time1)


  }
  
  makeChart(){
    this.chart = new Chart("canvas", {
      type: 'line',
      data: {
        labels: this.time1,
        datasets: [
          {
            label: "KW",
            data: this.KVA1,
            backgroundColor: '#845EC2',
            borderColor: '#845EC2',
            pointRadius: 5
  
          },
          {
            label: "KVA",
            data: this.KVA2,
            backgroundColor: '#FF8315',
            borderColor: '#FF8315',
            pointRadius: 5
  
          },

        ]
      },
      options: {
        aspectRatio:2,
        plugins:{
          legend:{
            // display:false
          }
        }
        // maintainAspectRatio: false
        // events: []
        
      }
      
    });
    // this.chart.update();

  }

  meterKVA(){ 
    this.chart.data.datasets[0].data = this.KVA1;
    this.chart.data.datasets[1].data = this.KVA2;

    // this.chart.data.datasets[0].label = "KVA Meter1";
    // this.chart.data.datasets[1].label = "KVA Meter2";

    this.chart.data.labels = this.time1;
    this.chart.update();
   }
  meterKVAR(){ 
    this.chart.data.datasets[0].data = this.KVAR1;
    this.chart.data.datasets[1].data = this.KVAR2;
    // this.chart.data.datasets[0].label = "KVAR Meter1";
    // this.chart.data.datasets[1].label = "KVA Meter2";
    this.chart.data.labels = this.time1;
    this.chart.update();
   }
  meterKW(){ 
    this.chart.data.datasets[0].data = this.KW1;
    this.chart.data.datasets[1].data = this.KW2;
    // this.chart.data.datasets[0].label = "KW Meter1";
    // this.chart.data.datasets[1].label = "KW Meter2";
    this.chart.data.labels = this.time1;
    this.chart.update();
   }


  meter1KVA(){  }
  meter1KVAR(){  }
  meter1KW(){  }

  meter2KVA(){  }
  meter2KVAR(){  }
  meter2KW(){  }

  meter3(){}


}
