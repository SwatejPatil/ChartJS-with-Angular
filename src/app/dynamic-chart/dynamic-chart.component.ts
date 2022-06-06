import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.css']
})
export class DynamicChartComponent implements OnInit {

  public chart: any;
ChartData_M: any = []
Device_Id: any = []
reading_time: any = []
KWh_D: any = []
KVARh_D: any = []
KVARh_R: any = []
KVAh_D: any = []
V_LL: any = []
V_LN: any = []
Aavg: any = []
KW: any = []
KVAR: any = []
KVA: any = []
PF: any = []



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
  }

  getDataForChart(){

    for(let i = this.ChartData_M.length - 1 ; i>=0;i--){

      this.KVAh_D.push(this.ChartData_M[i].KVAh_D);
      this.Device_Id.push(this.ChartData_M[i].Device_Id);
      this.reading_time.push(this.ChartData_M[i].reading_time);
      this.KWh_D.push(this.ChartData_M[i].KWh_D);
      this.KVARh_D.push(this.ChartData_M[i].KVARh_D);
      this.KVARh_R.push(this.ChartData_M[i].KVARh_R);
      this.KVAh_D.push(this.ChartData_M[i].KVAh_D);
      this.V_LL.push(this.ChartData_M[i].V_LL);
      this.V_LN.push(this.ChartData_M[i].V_LN);
      this.Aavg.push(this.ChartData_M[i].Aavg);
      this.KW.push(this.ChartData_M[i].KW);
      this.KVAR.push(this.ChartData_M[i].KVAR);
      this.KVA.push(this.ChartData_M[i].KVA);
      this.PF.push(this.ChartData_M[i].PF);      
    }

  }

  createChart(){

    this.chart = new Chart("canvas", {
      type: 'bar',
      data: {
        labels: this.reading_time,
        datasets: [
          {
            // label: "KVAh_D",
            data: this.KVA,
            backgroundColor: '#00FF33',
  
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


//  M_Device_Id(){
//    this.chart.datasets.data = 
//    this.chart.update();
//  }
//  M_reading_time(){
//    this.chart.datasets.data = 
//    this.chart.update();
//  }
 M_KWh_D(){
   this.chart.data.datasets[0].data = this.KWh_D
   this.chart.data.datasets[0].backgroundColor = 'blue'
   this.chart.update();
 }
 M_KVARh_D(){
   this.chart.data.datasets[0].data = this.KVARh_D
   this.chart.data.datasets[0].backgroundColor = 'yellow'
   this.chart.update();
 }
 M_KVARh_R(){
   this.chart.data.datasets[0].data = this.KVARh_R
   this.chart.data.datasets[0].backgroundColor = 'pink'
   this.chart.update();
 }
 M_KVAh_D(){
   this.chart.data.datasets[0].data = this.KVAh_D
   this.chart.data.datasets[0].backgroundColor = 'purple'
   this.chart.update();
 }
 M_V_LL(){
   this.chart.data.datasets[0].data = this.V_LL
   this.chart.data.datasets[0].backgroundColor = 'steelblue'
   this.chart.update();
 }
 M_V_LN(){
   this.chart.data.datasets[0].data = this.V_LN
   this.chart.data.datasets[0].backgroundColor = 'orange'
   this.chart.update();
 }
 M_Aavg(){
   this.chart.data.datasets[0].data = this.Aavg
   this.chart.data.datasets[0].backgroundColor = 'megenta'
   this.chart.update();
 }
 M_KW(){
   this.chart.destroy()
   this.chart = new Chart("canvas", {
    type: 'line',
    data: {
      labels: this.reading_time,
      datasets: [
        {
          // label: "KVAh_D",
          data: this.KVA,
          backgroundColor: '#00FF33',

        }

      ]
    },
    options: {
      aspectRatio:2.5

      // maintainAspectRatio: false
      // events: []
    }
    
  });
   this.chart.type = "line"
   this.chart.data.datasets[0].data = this.KW
   this.chart.data.datasets[0].backgroundColor = 'red'
   this.chart.update();
 }
 M_KVAR(){
  this.chart.type = 'line'
   this.chart.data.datasets[0].data = this.KVAR
   this.chart.data.datasets[0].backgroundColor = 'royalblue'
   this.chart.update();
 }
 M_KVA(){
  this.chart.type = 'bar'
   this.chart.data.datasets[0].data = this.KVA
   this.chart.data.datasets[0].backgroundColor = 'black'
   this.chart.update();
 }
 M_PF(){
   this.chart.data.datasets[0].data = this.PF
   this.chart.data.datasets[0].backgroundColor = 'blue'
   this.chart.update();
 }

}
