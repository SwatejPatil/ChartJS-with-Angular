import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChartapiService {
  getDataGauge() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getDataD(){
    // let url = "https://senselive.in/graph_swatej/chartdata.php";
    let url = "https://senselive.in/graph_swatej/sortmonth.php";
    // let url = "https://senselive.in/graph_swatej/sortday.php";
    return this.http.get(url);
  }
  getDataW(){
    // let url = "https://senselive.in/graph_swatej/sortweek.php";
    // let url = "https://senselive.in/graph_swatej/sortmonth.php";
    let url = "https://senselive.in/graph_swatej/sortday.php";
    return this.http.get(url);
  }

  getDataM(){
    let url = "https://senselive.in/graph_swatej/bigsortmonth.php";
    // let url = "https://senselive.in/graph_swatej/sortmonth.php";
    return this.http.get(url);
  }
}

