import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClientService } from 'src/app/services/client.service';
import { CollaboratorService } from 'src/app/services/collaborator.service';
declare var $: any;

@Component({
  selector: 'app-task-client',
  templateUrl: './task-client.component.html',
  styleUrls: ['./task-client.component.css'],
})
export class TaskClientComponent implements OnInit {
  public id = '';

  public token = localStorage.getItem('token');
  public data = false;
  public loadData = true;
  public btnTask = false;
  public page = 1; // Definiendo la propiedad `page`
  public pageSize = 5; // Definiendo el tamaño de la página
  public task: any = {
    asesor: '',
    type: '',
    priority : '',


  }
  public asesor: Array<any> = [];
  public time = { hour: 13, minute: 30 };
  public dates = GLOBAL.dates;

  constructor(
    private _route: ActivatedRoute,
    private _clientService: ClientService,
    private _colloboratorService: CollaboratorService
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

    this._colloboratorService.getCollaborators(this.token).subscribe(
      response => {

      this.asesor = response.data;
    });
  }
  registerTask()
  {
    if (this.time) {
      this.task.hour = this.time.hour + ':' + this.time.minute;
    }
    if (!this.task.asesor || !this.task.type || !this.task.priority || !this.task.task ) {
      this.showNotification('Ingrese datos Correctamente', 'danger');
    }
    else {
      this.btnTask = true;
      this.task.client = this.id;
      this.task.asesor = localStorage.getItem('_id');
      this._clientService.createClientTaskProsperccion(this.task, this.token).subscribe(
        response => {
          $('#modalTarea').modal('hide');
          this.task ={
            asesor: '',
            type: '',
            priority : '',
          };
          this.showNotification('Llamada Registrada Correctamente', 'success');
          this.btnTask = false;
        this.init_data(); // Refresh the list after registering a call
        },
        error => {
          this.showNotification('Error al Registrar Llamada', 'danger');
          this.btnTask = false;
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
