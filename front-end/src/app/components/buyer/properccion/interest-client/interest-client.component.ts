import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interest-client',
  templateUrl: './interest-client.component.html',
  styleUrls: ['./interest-client.component.css']
})
export class InterestClientComponent implements OnInit {
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
