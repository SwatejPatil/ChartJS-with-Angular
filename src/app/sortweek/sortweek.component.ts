import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';

@Component({
  selector: 'app-sortweek',
  templateUrl: './sortweek.component.html',
  styleUrls: ['./sortweek.component.css']
})
export class SortweekComponent implements OnInit {

  // DAY
ChartData_W: any = [];
time_W: any  = [];
KVAh_W:any=[]
KVAh_W_Data: any = [];
KVA_W: any = [];
KVAR_W: any = [];
KW_W: any = [];


public chart: any;

public chart2: any;
  KW_D: any;
  



constructor(public user: ChartdataService) {
  setTimeout(()=>{                           // <<<---using ()=> syntax
    // this.messageSuccess = false;
  }, 3000);

}

ngOnInit(): void {
  this.user.getDataW().subscribe(res => {
  this.ChartData_W =res;
  console.log(this.ChartData_W);
  this.sortday();
  // this.createChart();
});
}

sortday(){

  for(let i = this.ChartData_W.length - 1 ; i>=1;i--){
    this.KVAh_W.push(this.ChartData_W[i].KVAh_D);
    this.KVA_W.push(this.ChartData_W[i].KVA); 
    this.KVAR_W.push(this.ChartData_W[i].KVAR); 
    this.KW_W.push(this.ChartData_W[i].KW);     
    this.time_W.push(this.ChartData_W[i].reading_time);       
  }

  for(let i = this.KVAh_W.length - 1; i>=1;i--){
    this.KVAh_W_Data.push(this.KVAh_W[i] - this.KVAh_W[i+1])
  };
  this.KVAh_W_Data.reverse();
  this.time_W.reverse();
  this.time_W.shift();
  this.time_W.pop();

  console.log(this.KVAh_W_Data);
  console.log(this.time_W)



  this.chart = new Chart("canvas", {
    type: 'bar',
    data: {
      labels: this.time_W,
      datasets: [
        {
          label: "KVAh_W",
          data: this.KVAh_W_Data,
          backgroundColor: 'rgba(0, 255, 255, 0.7)',

        }

      ]
    },
    options: {
      // maintainAspectRatio: false
      // events: []
    }
    
  });

  this.chart2 = new Chart("canvas2", {
    type: 'line',
    data: {
      labels: this.time_W,
      datasets: [
        {
          label: "KVA",
          data: this.KVA_W,
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          borderColor:'rgba(255, 0, 0, 0.7)',

        },
        {
          label: "KVAR",
          data: this.KVAR_W,
          backgroundColor: 'rgba(0, 255, 0, 0.7)',
          borderColor: 'rgba(0, 255, 0, 0.7)',
        },
        {
          label: "KW",
          data: this.KW_W,
          backgroundColor: 'rgba(0, 0, 255, 0.7)',
          borderColor: 'rgba(0, 0, 255, 0.7)',

        }

      ]
    },
    options: {
      // events: []
    }
    
  });
  return;
}

}

