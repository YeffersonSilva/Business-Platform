import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call-client',
  templateUrl: './call-client.component.html',
  styleUrls: ['./call-client.component.css']
})
export class CallClientComponent implements OnInit {
  public id = '';

  constructor(
    private _route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];

    });

  }
}
