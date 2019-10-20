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
export class MasterServices {
  constructor(private http: Http, private config: AppConfig) { }
  public readonly headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json,Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods,text/plain'
  });
  
  BloodGroupFetch(BloodGroupId: any) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.config.APIUrl + this.config.GetBloodGroup + 'BloodGroupId=' + BloodGroupId, options).map((response: Response) => {
      return response.json();
    });
  }
  RoleFetch(RoleId: any) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.config.APIUrl + this.config.GetRole + 'RoleId=' + RoleId, options).map((response: Response) => {
      return response.json();
    });
  }
  GenderFetch(GenderId: any) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.config.APIUrl + this.config.GetGender + 'GenderId=' + GenderId, options).map((response: Response) => {
      return response.json();
    });
  }

  DistrictFetch(StateId, District) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.config.APIUrl + this.config.GetDistrict + 'StateId=' + StateId + '&District=' + District, options).map((response: Response) => {
      return response.json();
    });
  }
  StateFetch(StateId: any) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.config.APIUrl + this.config.GetState + 'StateId=' + StateId, options).map((response: Response) => {
      return response.json();
    });
  }
  

  //#endregion



}