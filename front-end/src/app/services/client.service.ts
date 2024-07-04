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
    return this._http.post(this.url + 'registerClientAdmin', data, { headers: headers });
  }

  verifyAccount( token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });
    return this._http.get(this.url + 'verifyAccount/'+token, { headers: headers });
  }


  getClients(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.get(this.url + 'getClients/' + filtro, { headers: headers });
  }

  getDataloginClient(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.get(this.url + 'getDataloginClient/' + id, { headers: headers });
  }

  updateClientAdmin(id: any ,data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.put(this.url + 'updateClientAdmin/'+ id, data, { headers: headers });
  }


  createClientCallProsperccion(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.post(this.url + 'createClientCallProsperccion', data, { headers: headers });
  }


  getClientCallsProsperccion(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.get(this.url + 'getClientCallsProsperccion/' + id, { headers: headers });
  }

  createClientEmailsProsperccion(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.post(this.url + 'createClientEmailsProsperccion', data, { headers: headers });
  }

  getClientEmailProsperccion(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.get(this.url + 'getClientEmailProsperccion/' + id, { headers: headers });
  }

  createClientTaskProsperccion(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.post(this.url + 'createClientTaskProsperccion', data, { headers: headers });
  }

  getClientTaskProsperccion(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    return this._http.get(this.url + 'getClientTaskProsperccion/' + id, { headers: headers });
  }



}

