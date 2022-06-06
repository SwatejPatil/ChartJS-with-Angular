import { Component, OnInit } from '@angular/core';
import { ChartapiService } from '../chartapi.service';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';

@Component({
  selector: 'app-interval-chart',
  templateUrl: './interval-chart.component.html',
  styleUrls: ['./interval-chart.component.css']
})
export class IntervalChartComponent implements OnInit {


  public myChart: any;
  ChartData: any = [];
  KVA: any = [];
  KW: any = [];
  KVAR: any = [];
  time: any = [];

  interval:any;


  KVA2: any = [];
  KW2: any = [];
  KVAR2: any = [];
  time2: any = [];
 
  constructor(public user: ChartdataService) {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
    }, 30);
  
  }
  
  ngOnInit(): void {
    this.user.allDayData().subscribe(res => {
    this.ChartData =res;
    // console.log(this.ChartData);
 
    this.getPieChartData();
    this.createChart();
    console.log(this.KVA);
    // this.getValue();
    });
  }

  
  getPieChartData(){
    for(let i = 0; i < this.ChartData.length -1; i++ ){
      this.KVA.push(this.ChartData[i].KVA);
      this.KVAR.push(this.ChartData[i].KVAR);
      this.KW.push(this.ChartData[i].KW);
      this.time.push(this.ChartData[i].reading_time);
    }
    console.log(this.KVA);
    
  }

  getValue(){
    this.KVA2 = [];
    this.KVAR2 = [];
    this.KW2 = [];
    this.time2 = [];
  
    this.interval = (<HTMLInputElement>document.getElementById('interval')).value;
    console.log(parseInt(this.interval ));


  
    // this.KVA2 = [...this.KVA];
    // this.time2 = [...this.time];
    // console.log(this.KVA2);
    // console.log(this.time2);

    for(let i = 0; i<this.KVA.length -1; i+=parseInt(this.interval )*2){
      this.KVA2.push(this.KVA[i]);
      this.time2.push(this.time[i])
    }
    console.log(this.KVA2);
    for(let i = 0; i<this.KVAR.length -1; i+=parseInt(this.interval )*2){
      this.KVAR2.push(this.KVAR[i]);
      // this.time2.push(this.time[i])
    }
    console.log(this.KVAR2);

    for(let i = 0; i<this.KW.length -1; i+=parseInt(this.interval )*2){
      this.KW.push(this.KW[i]);
      // this.time2.push(this.time[i])
    }
    console.log(this.KW2);
    
    
    
    this.myChart.data.datasets[0].data = this.KVA2;
    this.myChart.data.datasets[1].data = this.KVAR2;
    this.myChart.data.datasets[2].data = this.KW2;
    this.myChart.data.labels = this.time2;

   

    this.myChart.update();
    
  }
  createChart(){
  // console.log('helloe');
  // setup 
  const data = {
    labels: this.time,
    datasets: [
      {
      label:'KVA',
      data: this.KVA,
      backgroundColor: 'red',
      borderColor: 'rgb(255, 204, 204)',
      // borderWidth: 1
      pointRadius: 0
      },
      {
        label:'KVAR',
        data: this.KVAR,
        backgroundColor: 'blue',
        borderColor: 'rgb(179, 179, 255)',
        // borderWidth: 1
        pointRadius: 0
        },

        {
          label:'KW',
          data: this.KW,
          backgroundColor: 'green',
          borderColor: 'rgb(179, 255, 204)',
          // borderWidth: 1
          pointRadius: 0
          }
  
  ]
  };


  // render init block
   this.myChart = new Chart("myChart22", {
    type: 'line',
    data,
    options: {
      aspectRatio:2,
      scales: {
        // y: {
        //   beginAtZero: true
        // }
      }
    }
  }
  );


  }

  
  }
