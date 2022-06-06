import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartdataService {

  constructor(private http: HttpClient) { }
  getDataD(){
    // let url = "https://senselive.in/graph_swatej/chartdata.php";
    // let url = "https://senselive.in/graph_swatej/sortmonth.php";
    let url = "https://senselive.in/graph_swatej/sortday.php";
    return this.http.get(url);
  }

  getDataM2(){
    // let url = "https://senselive.in/graph_swatej/chartdata.php";
    let url = "https://senselive.in/graph_swatej/sortmonth2.php";
    // let url = "https://senselive.in/graph_swatej/sortday.php";
    return this.http.get(url);
  }

  getDataW(){
    // let url = "https://senselive.in/graph_swatej/chartdata.php";
    let url = "https://senselive.in/graph_swatej/sortweek.php";
    // let url = "https://senselive.in/graph_swatej/sortday.php";
    return this.http.get(url);
  }

  getDataM(){
    // let url = "https://senselive.in/graph_swatej/chartdata.php";
    let url = "https://senselive.in/graph_swatej/sortmonth.php";
    // let url = "https://senselive.in/graph_swatej/sortday.php";
    return this.http.get(url);
  }

  allDayData(){
    let url = "https://senselive.in/graph_swatej/alldaydata.php";
    return this.http.get(url);
  }

  allDayData_new(){
    let url = "https://senselive.in/graph_swatej/alldaydata_new.php";
    return this.http.get(url);
  }

  allMonthData(){
    let url = "https://senselive.in/graph_swatej/allmonthdata.php";
    return this.http.get(url);
  }

  Meter1(){
    let url = "https://senselive.in/graph_swatej/pieChart.php";
    return this.http.get(url);
  }
  Meter2(){
    let url = "https://senselive.in/graph_swatej/alldaydata.php";
    return this.http.get(url);
  }
  Meter3(){
    let url = "https://senselive.in/graph_swatej/pie_meter3.php";
    return this.http.get(url);
  }
  Meter4(){
    let url = "https://senselive.in/graph_swatej/pie_meter4.php";
    return this.http.get(url);
  }
}
