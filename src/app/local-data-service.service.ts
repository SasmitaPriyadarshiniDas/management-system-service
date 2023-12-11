import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDataServiceService {

  constructor(public _httpClient: HttpClient) { }

  private baseUrl = '../../assets/userData.json'


  sendData(formData:any):Observable<any>{
    return this._httpClient.post(this.baseUrl,formData)
  }
}
