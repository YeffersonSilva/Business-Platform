import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public url = GLOBAL.url;

  constructor(private _http: HttpClient) {
    console.log(this.url);
  }


  registerClientAdmin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.post(this.url + 'registerClientAdmin',data,  { headers: headers });
  }


}
