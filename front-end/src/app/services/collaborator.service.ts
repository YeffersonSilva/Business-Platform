import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  public url = GLOBAL.url;

  constructor(private _http: HttpClient) {
    console.log(this.url);
  }

  loginCollaboratorAdmin(data : any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'loginCollaboratorAdmin', data, { headers: headers });
  }
  registerCollaboratorAdmin(data : any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'registerCollaboratorAdmin', data, { headers: headers });
  }


}
