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
export class DoctorServices{
  constructor(private http: Http, private config: AppConfig) { }
  public readonly headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json,Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods,text/plain'
  });
 DoctorFetch(DoctorId: any) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.config.APIUrl + this.config.GetDoctor + 'DoctorId=' + DoctorId, options).map((response: Response) => {
      return response.json();
    });
  }
  AddDoctor(data: any) {
    const body = JSON.stringify(data)
    return this.http.post(`${this.config.APIUrl}${this.config.DoctorCreate}`, body, { headers: this.headers })
      .map(res => {
        return res.json();
      });
  };
  DoctorPut(data: any) {
    const body = JSON.stringify(data)
    return this.http.post(`${this.config.APIUrl}${this.config.DoctorUpdate}`, body, { headers: this.headers })
      .map(res => {
        return res.json();
      });
  };
}