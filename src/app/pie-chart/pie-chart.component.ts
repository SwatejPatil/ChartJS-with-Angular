import { Component, OnInit } from '@angular/core';
import { ChartapiService } from '../chartapi.service';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {


  public myChart: any;

  KVAh1: any = [] ;
  KVAh2: any = [] ;
  KVAh3: any = [] ;
  KVAh4: any = [] ;


  Main_KW: any = [] ;
  Main_KVA: any = [] ;
  Main_KVAR: any = [] ;
  
  Meter_ids: any = [] ;

  KW1: any = [] ;
  KW2: any = [] ;
  KW3: any = [] ;
  KW4: any = [] ;

  KW5: any = [] ;

  Meter1: any = [];
  Meter2: any = [];
  Meter3: any = [];
  Meter4: any = [];

  totalMeter:any = [];

  meterA:any = []
  meterB: any = []
  meter: any ;

  

  
  
  constructor(public user: ChartdataService) {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
    }, 30);
  
  }
  
  ngOnInit(): void {
    

    this.user.Meter1().subscribe(res => {
    this.totalMeter =res; 
  
    this.meterA = [...this.totalMeter[0]]
    // this.meterB = [...this.totalMeter[1]] 

    for(let i =0; i<this.totalMeter.length ; i++ ){
      for(let j =0; j<this.meterA.length ; j++ )
      this.Main_KW.push(this.totalMeter[i][j].KW);
    }
    for(let i =0; i<this.totalMeter.length ; i++ ){
      for(let j =0; j<this.meterA.length ; j++ )
      this.Main_KVA.push(this.totalMeter[i][j].KVA);
    }
    for(let i =0; i<this.totalMeter.length ; i++ ){
      for(let j =0; j<this.meterA.length ; j++ )
      this.Main_KVAR.push(this.totalMeter[i][j].KVAR);
    }

    for(let i =0; i<this.totalMeter.length ; i++ ){
      for(let j =0; j<this.meterA.length ; j++ )
      this.Meter_ids.push(this.totalMeter[i][j].Device_Id);
    }
    console.log(this.Meter_ids);   
    console.log("KW--->", this.Main_KW);    
    this.getPieChartData();
    this.createChart();
    });
  }
  
  getPieChartData(){
    
  }
  createChart(){
  // console.log('helloe');
  // setup 
  const data = {
    labels: this.Meter_ids,
    datasets: [{
      data: this.Main_KW,
      backgroundColor: ['#E4F555', '#22FFEF', '#FF8700', '#FF7AA9', '#845EC2', '#008F7A'],
      borderColor: ['#E4F555', '#22FFEF', '#FF8700', '#FF7AA9', '#845EC2', '#008F7A'],
      borderWidth: 1
    }]
  };


  // render init block
   this.myChart = new Chart("myChart", {
    type: 'doughnut',
    data,
    options: {
      // aspectRatio:3.5,
      
    }
  }
  );


  }

  KW(){
    this.myChart.data.datasets[0].data = this.Main_KW;
    this.myChart.update();
  }

  KVA(){
    this.myChart.data.datasets[0].data = this.Main_KVA;
    this.myChart.data.datasets[0].backgroundColor = ['#E4F555',  '#FF8700', '#FF7AA9', '#845EC2', '#22FFEF','#008F7A'];
    this.myChart.data.datasets[0].borderColor = ['#E4F555',  '#FF8700', '#FF7AA9', '#845EC2', '#22FFEF','#008F7A'];
    this.myChart.update();
  }

  KVAR(){
    this.myChart.data.datasets[0].data = this.Main_KVAR;
    this.myChart.data.datasets[0].backgroundColor = ['#E4F555','#FF8700', '#22FFEF',  '#FF7AA9', '#845EC2', '#008F7A'];
    this.myChart.data.datasets[0].borderColor = ['#E4F555','#FF8700', '#22FFEF',  '#FF7AA9', '#845EC2', '#008F7A'];
    this.myChart.update();
  }

  
  }