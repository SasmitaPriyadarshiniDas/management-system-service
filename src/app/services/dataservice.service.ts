import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as data from '../../assets/userData.json'
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(public _httpClient: HttpClient) { }

  private apiUrl = '../../assets/userData.json'


  sendData(formData:any):Observable<any>{
    return this._httpClient.post(this.apiUrl,formData)
  }


}
