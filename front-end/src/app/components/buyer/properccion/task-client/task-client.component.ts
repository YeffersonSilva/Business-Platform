import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-client',
  templateUrl: './task-client.component.html',
  styleUrls: ['./task-client.component.css']
})
export class TaskClientComponent implements OnInit {

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
