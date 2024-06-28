import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
declare var $: any;

@Component({
  selector: 'app-call-client',
  templateUrl: './call-client.component.html',
  styleUrls: ['./call-client.component.css']
})
export class CallClientComponent implements OnInit {
  public id = '';
  public call: any = {
    result: '',
    date: '',
    note: '',
    hour: ''
  };
  public time = { hour: 13, minute: 30 };
  public bntLoad = false;
  public token = localStorage.getItem('token');
  public calls: Array<any> = [];
  public page = 1; // Definiendo la propiedad `page`
  public pageSize = 10; // Definiendo el tamaño de la página

  public data = false;
  public loadData = true;

  constructor(
    private _route: ActivatedRoute,
    private _clientService: ClientService
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
    }
    );
  }

  init_data() {
    this._clientService.getClientCallsProsperccion(this.id, this.token).subscribe(
      response => {
        this.calls = response.data;
      },
      error => {
        console.error(error);
      }
    );
  }

  registerCall() {
    if (this.time) {
      this.call.hour = this.time.hour + ':' + this.time.minute;
    }

    if (!this.call.date || !this.call.hour || !this.call.result) {
      this.showNotification('Ingrese datos Correctamente', 'danger');
    } else {
      this.bntLoad = true;
      this.call.client = this.id;
      this.call.asesor = localStorage.getItem('_id');
      this._clientService.createClientCallProsperccion(this.call, this.token).subscribe(
        response => {
          $('#modalLlamada').modal('hide');
          this.showNotification('Llamada Registrada Correctamente', 'success');
          this.bntLoad = false;
        this.init_data(); // Refresh the list after registering a call
        },
        error => {
          this.showNotification('Error al Registrar Llamada', 'danger');
          this.bntLoad = false;
        }
      );
    }
  }

  private showNotification(message: string, type: string) {
    $.notify(message, {
      type: type,
      spacing: 10,
      timer: 2000,
      placement: {
        from: 'top',
        align: 'right',
      },
      delay: 1000,
      animate: {
        enter: 'animated bounce',
        exit: 'animated bounce',
      },
    });
  }
}
