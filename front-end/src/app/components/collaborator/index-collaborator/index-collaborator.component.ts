import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from 'src/app/services/collaborator.service';
declare var $: any;
@Component({
  selector: 'app-index-collaborator',
  templateUrl: './index-collaborator.component.html',
  styleUrls: ['./index-collaborator.component.css']
})
export class IndexCollaboratorComponent implements OnInit {

  public token = localStorage.getItem('token');
  public collaborators: Array<any> = [];
  public collaborators_const: Array<any> = [];

  public filtro = '';
  public page = 1;
  public pageSize = 20;

  public loadState = false;

  constructor(
    private _collaboratorService: CollaboratorService,


  ) { }

  ngOnInit(): void {
    this.init_data();
  }


  init_data() {
    this._collaboratorService.getCollaborators(this.token).subscribe(
      response => {
        if (response == undefined || !response.data) {
          this.showNotification('Error al cargar los colaboradores', 'danger');
        } else {
          this.collaborators = response.data;
          this.collaborators_const = this.collaborators;
        }
      },
      error => {
        this.showNotification('Error al cargar los colaboradores: ' + error.message, 'danger');
      }
    );
  }
  private showNotification(message: string, type: string) {
    $.notify(message, {
      type: type,
      spacing: 10,
      timer: 2000,
      placement: {
        from: 'top',
        align: 'right'
      },
      delay: 1000,
      animate: {
        enter: 'animated bounce',
        exit: 'animated bounce'
      }
    });
  }
  filtrar() {
    if (this.filtro) {
      var term = new RegExp(this.filtro, 'i');
      this.collaborators = this.collaborators_const.filter(item => term.test(item.name) || term.test(item.lastname) || term.test(item.email));
    }
    else {
      this.collaborators = this.collaborators_const;
    }
  }

  set_state(id: any, currentState: any) {
    // Cambiar el estado al opuesto del estado actual
    const newState = !currentState;
    this.loadState = true; // Mostrar el spinner

    this._collaboratorService.setState(id, { state: newState }, this.token).subscribe(
      response => {
        $('#delete-' + id).modal('hide');
        this.loadState = false; // Ocultar el spinner
        this.init_data(); // Recargar los datos
      },
      error => {
        this.loadState = false; // Ocultar el spinner en caso de error
        this.showNotification('Error al cambiar el estado: ' + error.message, 'danger');
      }
    );
  }

}
