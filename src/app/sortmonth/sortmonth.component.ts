import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';


@Component({
  selector: 'app-sortmonth',
  templateUrl: './sortmonth.component.html',
  styleUrls: ['./sortmonth.component.css']
})
export class SortmonthComponent implements OnInit {

  // DAY
ChartData_M: any = [];
time_M: any  = [];
KVAh_M:any=[];
KVA_M:any=[];
KVAR_M:any=[];
KW_M:any=[]
KVAh_M_Data: any = [];

public chart: any;
public chart2: any;
  KW_D: any;


constructor(public user: ChartdataService) {
  setTimeout(()=>{                           // <<<---using ()=> syntax
    // this.messageSuccess = false;
  }, 3000);

}

ngOnInit(): void {
  this.user.getDataM().subscribe(res => {
  this.ChartData_M =res;
  console.log(this.ChartData_M);
  this.sortday();
  // this.createChart();
});
}

sortday(){

  for(let i = this.ChartData_M.length - 1 ; i>=1;i--){
    this.KVAh_M.push(this.ChartData_M[i].KVAh_D);
    this.KVA_M.push(this.ChartData_M[i].KVA); 
    this.KVAR_M.push(this.ChartData_M[i].KVAR); 
    this.KW_M.push(this.ChartData_M[i].KW);   
    this.time_M.push(this.ChartData_M[i].reading_time);       
  }

  for(let i = this.KVAh_M.length - 1; i>=1;i--){
    this.KVAh_M_Data.push(this.KVAh_M[i] - this.KVAh_M[i+1])
  };
  this.KVAh_M_Data.reverse();
  this.time_M.reverse();
  this.time_M.shift();
  this.time_M.pop();

  console.log(this.KVAh_M_Data);
  console.log(this.time_M)



  this.chart = new Chart("canvas", {
    type: 'bar',
    data: {
      labels: this.time_M,
      datasets: [
        {
          label: "KVAh_M",
          data: this.KVAh_M_Data,
          backgroundColor: 'rgba(50, 25, 255, 0.7)',

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
      labels: this.time_M,
      datasets: [
        {
          label: "KVA",
          data: this.KVA_M,
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          borderColor:'rgba(255, 0, 0, 0.7)',

        },
        {
          label: "KVAR",
          data: this.KVAR_M,
          backgroundColor: 'rgba(0, 255, 0, 0.7)',
          borderColor: 'rgba(0, 255, 0, 0.7)',
        },
        {
          label: "KW",
          data: this.KW_M,
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


