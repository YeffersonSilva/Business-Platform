import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-aside-client',
  templateUrl: './aside-client.component.html',
  styleUrls: ['./aside-client.component.css']
})
export class AsideClientComponent implements OnInit {
  public id = '';
  public load_data = true;
  public token = localStorage.getItem('token');

  public client: any = {

  };
  public data = false;
  constructor(
    private _route: ActivatedRoute,
    private clientService: ClientService

  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];

      this.load_data = true;
      this.clientService
        .getDataloginClient(this.id, this.token)
        .subscribe(
          (response) => {
            if (response.data != undefined) {
              this.client = response.data;
              this.data = true;
            } else {
              this.data = false;
            }
            this.load_data = false;
          },
          (error) => {
            console.error(error);
            this.load_data = false;
          }
        );

    });
  }

}
