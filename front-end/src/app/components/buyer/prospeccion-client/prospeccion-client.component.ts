import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prospeccion-client',
  templateUrl: './prospeccion-client.component.html',
  styleUrls: ['./prospeccion-client.component.css']
})
export class ProspeccionClientComponent implements OnInit {
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
