import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  public user :any = {}

  constructor() {
    let strUser:any = localStorage.getItem('user');
    this.user = JSON.parse(strUser);

   }

  ngOnInit(): void {
  }


  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
