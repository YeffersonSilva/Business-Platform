import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
declare var $:any;

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html', // Asegúrate de que la ruta sea correcta
  styleUrls: ['./index-client.component.css']
})
export class IndexClientComponent implements OnInit {

  public token = localStorage.getItem('token');
  public client : Array<any> =[];
  public clients_const : Array<any> =[];

  public filtro = '';
  public page = 1;
  public pageSize = 25;

  public load_state = false;
  public load_data = false;

  constructor(
    private _clienteService:ClientService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(
      (params:Params) => {
        this.filtro = params.filter;
        if (this.filtro) {
          this.filtrar();
        } else {
        this.client = [];
        }


      }
    );
  }

  init_data() {
    if (this.filtro) {
      this._router.navigate(['/client'], { queryParams: { filter: this.filtro } });
    }
    else {
      this._router.navigate(['/client'] );
    }

  }
  filtrar(){

    if (this.filtro) {
      this.load_data = true;
      this._clienteService.getClients(this.filtro, this.token).subscribe(
        response => {
          this.client = response.data;
          this.load_data = false;
          console.log(this.client);
        }
      );
    }else {
      this.client = [];
      }

  }
  set_state(id:any,estado:any){


  }

}
