import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
declare var $: any;

@Component({
  selector: 'app-email-client',
  templateUrl: './email-client.component.html',
  styleUrls: ['./email-client.component.css'],
})
export class EmailClientComponent implements OnInit {
  public id = '';
  public token = localStorage.getItem('token');
  public data = false;
  public loadData = true;
  public bntSetEmail = false;
public page = 1; // Definiendo la propiedad `page`
  public pageSize = 5; // Definiendo el tamaño de la página
  public email: any = {
    email: '',
    affair: '',
    content: '',
  };

  public emails: Array<any> = [];

  constructor(
    private _route: ActivatedRoute,
    private _clientService: ClientService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this._clientService
        .getClientCallsProsperccion(this.id, this.token)
        .subscribe((response) => {
          if (response.data != undefined) {
            this.data = true;
            this.loadData = false;
            this.init_data();
          } else {
            this.data = false;
            this.loadData = false;
          }
        });
    });
  }

  init_data() {
    this._clientService
      .getClientEmailProsperccion(this.id, this.token)
      .subscribe((response) => {
        this.emails = response.data;
      });
  }

  set_email() {
    if (!this.email.affair) {
      this.showNotification('Ingrese el asunto Correctamente', 'danger');
    } else if (!this.email.content) {
      this.showNotification('Ingrese el contenido Correctamente', 'danger');
    } else {
      this.bntSetEmail = true;
      this.email.client = this.id;
      this.email.asesor = localStorage.getItem('_id');
      this._clientService
        .createClientEmailsProsperccion(this.email, this.token)
        .subscribe(
          (response) => {
            $('#modalEmail').modal('hide');
            this.showNotification('Se Envio el Correo', 'success');
            this.bntSetEmail = false;
            this.init_data();
          },
          (error) => {
            this.showNotification('Error al Registrar Correo', 'danger');
            this.bntSetEmail = false;
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

  toggleEmail(id:any){
    var clase = $('#card_'+id).attr('class');

    if(clase=='card-spacer-x pt-2 pb-5 toggle-off-item'){
      $('#card_'+id).removeClass('toggle-off-item');
      $('#card_'+id).addClass('toggle-on-item');
    }else if(clase=='card-spacer-x pt-2 pb-5 toggle-on-item'){
      $('#card_'+id).removeClass('toggle-on-item');
      $('#card_'+id).addClass('toggle-off-item');
    }
 }
}
