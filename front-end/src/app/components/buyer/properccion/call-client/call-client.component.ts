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

  constructor(
    private _route: ActivatedRoute,
    private _clientService: ClientService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  registerCall() {
    if (this.time || this.time != undefined || this.time != null) {
      this.call.hour = this.time.hour + ':' + this.time.minute;
    }

    if (!this.call.date || !this.call.hour || !this.call.result) {
      this.showNotification('Ingrese datos Correctamente', 'danger');
    } else {
      console.log(this.call);
      this.bntLoad = true;
      this._clientService.createClientCallProsperccion(this.call, this.token).subscribe(
        response => {
          this.showNotification('Llamada Registrada Correctamente', 'success');
          this.bntLoad = false;
        },
        (error) => {
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
