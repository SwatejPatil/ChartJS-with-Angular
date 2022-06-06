import { Component, OnInit } from '@angular/core';
import { ChartapiService } from '../chartapi.service';
import Chart from 'chart.js/auto';
import { ChartdataService } from '../chartdata.service';


@Component({
  selector: 'app-allday',
  templateUrl: './allday.component.html',
  styleUrls: ['./allday.component.css']
})
export class AlldayComponent implements OnInit {

    // DAY
  ChartData_D: any = [];
  time_D: any  = [];
  KVAh_D:any=[];
  KVA_D:any=[];
  KVAR_D:any=[];
  KW_D:any=[];
  KVAh_D_Data: any = [];
  KVAh_D_Data2: any = [];

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

  chunk:any = [];
  avg:any= [];


  constructor(public user: ChartdataService) {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
    }, 3000);

  }

  ngOnInit(): void {
    this.user.allDayData_new().subscribe(res => {
    this.ChartData_D =res;
    this.sortday();
    
    // this.avarage();

    // setTimeout(()=>{                           // <<<---using ()=> syntax
    //   // this.messageSuccess = false;
    //   this.createChart();
    // }, 3000);
    this.createChart();

    
 });
  }

  sortday(){

    // for(let i = this.ChartData_D.length - 1 ; i>=1;i-=120){
    //   this.KVAh_D.push(this.ChartData_D[i].KVAh_D);
    //   this.KVA_D.push(this.ChartData_D[i].KVA); 
    //   this.KVAR_D.push(this.ChartData_D[i].KVAR); 
    //   this.KW_D.push(this.ChartData_D[i].KW);   
    //   this.time_D.push(this.ChartData_D[i].reading_time);       
    // }
    // var length = 16;
    // for(var i =0; i<this.time_D.length; i++){
    //   this.sort_date[i]= this.time_D[i].substring(0, length);
    //   // this.sort_date[i]= this.time_D[i];
    // }
    
    // for(let i = this.KVAh_D.length - 1; i>=1;i--){
    //   this.KVAh_D_Data.push(this.KVAh_D[i] - this.KVAh_D[i+1])
    // };
    // this.KVAh_D_Data.reverse();
    // this.sort_date.reverse();

    for(let i=0; i<this.ChartData_D.length-1; i++  ){
      // this.KVAh_D.push(this.ChartData_D[i].KVAh_D);
      // this.KVA_D.push(this.ChartData_D[i].KVA); 
      // this.KVAR_D.push(this.ChartData_D[i].KVAR); 
      this.KW_D.push(parseInt(this.ChartData_D[i].current));   
      // this.time_D.push(this.ChartData_D[i].date_time);

    }

    for(let i=0; i<this.ChartData_D.length-1; i+=60  ){
      // this.KVAh_D.push(this.ChartData_D[i].KVAh_D);
      // this.KVA_D.push(this.ChartData_D[i].KVA); 
      // this.KVAR_D.push(this.ChartData_D[i].KVAR); 
      // this.KW_D.push(parseInt(this.ChartData_D[i].current));   
      this.time_D.push(this.ChartData_D[i].date_time);

    }

    let total = 0;

    // for ( let i = 0; i < this.KW_D.length; i++ ) {
    //   total += parseInt(this.KW_D[i]);
    // }

    // console.log( total / this.KW_D.length );

    for ( let i = 0; i < 11; i++ ) {
      total += parseInt(this.KW_D[i]);
    }
    const res = [];
    // const avg = [];
    // const chunk:any = [];

    for(let i = 0; i<this.KW_D.length; i+=60){
      const chunk = this.KW_D.slice(i, i+=60)
      res.push(parseInt(chunk)) 

      for(let j=0; j<chunk.length; j++){
        const average = chunk.reduce((a:any, b:any) => a + b, 0) / chunk.length;
        this.avg.push(average)
      // console.log(average);
      }
      // console.log(chunk);
    }
    // console.log(this.chunk);
    console.log(this.avg);

    // console.log( total / 10 );
    // console.log(this.KVA_D)

          //   function sliceIntoChunks(arr, chunkSize) {
          //     const res = [];
          //     for (let i = 0; i < arr.length; i += chunkSize) {
          //         const chunk = arr.slice(i, i + chunkSize);
          //         res.push(chunk);
          //     }
          //     return res;
          // }
          
          // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          // console.log(sliceIntoChunks(arr, 3));   
  }


  avarage(){
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const res = [];
    // const avg = [];
    // // const chunk:any = [];

    // for(let i = 0; i<arr.length; i+=2){

    //   const chunk = arr.slice(i, i+2)
    //   res.push(chunk) 

    //   for(let j=0; j<chunk.length; j++){
    //     const average = chunk.reduce((a, b) => a + b, 0) / chunk.length;
    //     avg.push(average)
    //   // console.log(average);
    //   }
    //   // console.log(chunk);
    // }
    // // console.log(this.chunk);
    // console.log(avg);


    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const res = [];
    // const avg = [];
    // const chunk:any = [];

    for(let i = 0; i<this.KW_D.length; i+=60){
      const chunk = this.KW_D.slice(i, i+=60)
      res.push(parseInt(chunk)) 

      for(let j=0; j<chunk.length; j++){
        const average = chunk.reduce((a:any, b:any) => a + b, 0) / chunk.length;
        this.avg.push(average)
      // console.log(average);
      }
      // console.log(chunk);
    }
    // console.log(this.chunk);
    console.log(this.avg);
    
    
  }

  createChart(){
    this.config = {
      type: 'line',
      data: {
        labels: this.time_D,
        datasets: [
          {
            label: "KW_D",
            data: this.avg,
            backgroundColor: 'rgba(255, 0, 0, 0.7)',

          }

        ]
      },
      options: {
        // events: []
      }
      
    }
    this.chart = new Chart("canvasL", this.config);

    this.sort_date2.pop();
    this.KVAh_D_Data.pop();
  }

//   createChart(){
  
//     this.chart = new Chart("canvasL", {
//       type: 'line',
//       data: {
//         labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
//  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', '2022-05-18',
//  '2022-05-19'],
//         datasets: [
//           {
//             label: "KW",
//             data: ['467.35','576.14', '572.73', '79.52', '92.38', '574.05', '573.71', '576.48', '574.05', '573.71'],
//             backgroundColor: '#00FF33',
//             borderColor: '#00FF33'
  
//           },
//           {
//             label: "KVA",
//             data: ['542.97', '542.77', '536.98', '327.82', '17.15', '0.00', '538.27', '541.62', '535.71', '541.86'],
//             backgroundColor: '#00C7FF',
//             borderColor:'#00C7FF'
  
//           }  
//         ]
//       },
//       options: {
//         aspectRatio:3
//       }
      
//     });
//   }

  // filterData(){

  //    this.sort_date2 = [...this.sort_date]
  //    console.log(this.sort_date2);
  //    console.log(this.KVAh_D_Data);

  
  //   this.startdate = document.getElementById('startdate');    
  //   this.enddate = document.getElementById('enddate');


  //   this.indexstartdate = this.sort_date2.indexOf(this.startdate.value);
  //   this.indexenddate = this.sort_date2.indexOf(this.enddate.value);
    
    
  //   console.log(this.indexstartdate);
  //   console.log(this.indexenddate);

  //   this.filterDate = this.sort_date2.slice(this.indexstartdate, this.indexenddate+1)
  //   this.chart.config.data.labels = this.filterDate;
    
  //   this.KVAh_D_Data2 = [...this.KVAh_D_Data]
  //   this.filterDatapoints = this.KVAh_D_Data2.slice(this.indexstartdate, this.indexenddate+1)
  //   this.chart.config.data.datasets[0].data = this.filterDatapoints;


  //   this.chart.update();

  //   // var a = [-1,-2,-3,-4,-5];
  //   // var b = a.map( s => Math.abs(s));
    

  // }
}
