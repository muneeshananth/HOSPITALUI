import { Injectable } from '@angular/core';
import { Headers, HttpModule, RequestOptions, Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../_AppConfig/appconfig';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/ie';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Body } from '@angular/http/src/body';

@Injectable()
export class HospitalServices{
  constructor(private http: Http, private config: AppConfig) { }
  public readonly headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json,Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods,text/plain'
  });
  HospitalFetch(HospitalId: any) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.config.APIUrl + this.config.GetHospital + 'HospitalId=' + HospitalId, options).map((response: Response) => {
      return response.json();
    });
  }
  addhospital(data: any) {
    const body = JSON.stringify(data)
    return this.http.post(`${this.config.APIUrl}${this.config.HospitalCreate}`, body, { headers: this.headers })
      .map(res => {
        return res.json();
      });
  };

  HospitalPut(data: any) {
    const options = new RequestOptions({ headers: this.headers });
    const body = JSON.stringify(data)
    return this.http.put(this.config.APIUrl + 'HospitalUpdate', body, options).map((response: Response) => {
      return response.json();
    });
  };
}