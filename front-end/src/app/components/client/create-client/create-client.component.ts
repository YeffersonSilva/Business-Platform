import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public client: any = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    n_document: '',
    rol: '',
    gender: '',
    country: '',
    city: '',
    address: '',
    brith: '',
  };
  public btnRegister = false;


  public token: any = localStorage.getItem('token');


  constructor() { }

  ngOnInit(): void {
  }

  registerClient(registerForm: any) {
  }

}
