import { Component, OnInit } from '@angular/core';
import { ChartapiService } from '../chartapi.service';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';

@Component({
  selector: 'app-allmonth',
  templateUrl: './allmonth.component.html',
  styleUrls: ['./allmonth.component.css']
})
export class AllmonthComponent implements OnInit {

  // DAY
ChartData_D: any = [];
time_D: any  = [];
KVAh_W:any=[]
KVAh_W_Data: any = [];
KVAh_W_Data2: any = [];
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
  this.user.allMonthData().subscribe(res => {
  this.ChartData_D =res;
  console.log(this.ChartData_D);
  this.sortday();
  // this.createChart();
});
}

sortday(){

  for(let i = this.ChartData_D.length - 1 ; i>=1;i-=1){
    this.KVAh_W.push(this.ChartData_D[i].KVAh_D);
    this.KVA_W.push(this.ChartData_D[i].KVA); 
    this.KVAR_W.push(this.ChartData_D[i].KVAR); 
    this.KW_W.push(this.ChartData_D[i].KW);      
  }

  for(let i = this.ChartData_D.length - 1 ; i>=1;i-=200){  
    this.time_D.push(this.ChartData_D[i].reading_time);       
  }

  for(let i = this.KVAh_W.length - 1; i>=1;i-=200){
    this.KVAh_W_Data.push(this.KVAh_W[i] - this.KVAh_W[i+1])
  };

  for ( let i=0; i<this.KVAh_W_Data.length; i++){
    if(this.KVAh_W_Data[i]>=0){
      this.KVAh_W_Data2.push(this.KVAh_W_Data[i])
    }
    else{
      this.KVAh_W_Data[i] = -this.KVAh_W_Data[i];
      this.KVAh_W_Data2.push(this.KVAh_W_Data[i])
    }
}
  // this.KVAh_W_Data = this.KVAh_W_Data.map( (s: number) => Math.abs(s));
  console.log(this.KVAh_W_Data);
  

  this.KVAh_W_Data.reverse();
  this.time_D.reverse();
  this.time_D.shift();
  this.time_D.pop();

  console.log(this.KVAh_W_Data);
  console.log(this.time_D)



  this.chart = new Chart("canvas", {
    type: 'line',
    data: {
      labels: this.time_D,
      datasets: [
        {
          label: "KVAh",
          data: this.KVAh_W_Data2,
          backgroundColor: 'rgba(0, 0, 255, 0.7)',
          borderColor: 'rgba(0, 0, 255, 0.7)'

        }

      ]
    },
    options: {
      maintainAspectRatio: true
      // events: []
    }
    
  });
}

}