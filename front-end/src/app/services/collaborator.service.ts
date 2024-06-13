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

  loginCollaboratorAdmin(data : any ): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'loginCollaboratorAdmin', data, { headers: headers });
  }
  registerCollaboratorAdmin(data : any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token})
    return this._http.post(this.url + 'registerCollaboratorAdmin', data, { headers: headers });
  }

  getCollaborators(token : any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token})
    return this._http.get(this.url + 'getCollaborators',  { headers: headers });
  }
  setState(id: any,data: any,token : any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token})
    return this._http.put(this.url + 'setState/'+id,data , { headers: headers });
  }

}
