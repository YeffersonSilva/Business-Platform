import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-email-client',
  templateUrl: './email-client.component.html',
  styleUrls: ['./email-client.component.css']
})
export class EmailClientComponent implements OnInit {
  public id = '';
  public token = localStorage.getItem('token');
  public data = false;
  public loadData = true;

  public email: any = {
    email: '',
    affair: '',
    content: ''
  };

  constructor(
    private _route: ActivatedRoute,
    private _clientService: ClientService,

  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this._clientService.getClientCallsProsperccion(this.id,this.token).subscribe(
        response=>{
          if(response.data != undefined){
            this.data = true;
            this.loadData = false;
            this.init_data();
          }else{
            this.data = false;
            this.loadData = false;
          }
        }
      );

    });

  }


  init_data(){
    // console.log(this.data);
  }

}
