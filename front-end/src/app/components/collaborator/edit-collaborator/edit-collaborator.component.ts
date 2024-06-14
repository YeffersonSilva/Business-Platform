import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
declare var $: any;

@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.css'],
})
export class EditCollaboratorComponent implements OnInit {
  public id = '';
  public collaborator: any = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    n_document: '',
    rol: '',
    gender: '',
    country: '',
  };
  public btnUpdate = false;
  public token: any = localStorage.getItem('token');
  public load_data = false;
  public data = false;

  constructor(
    private _collaboratorService: CollaboratorService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this.load_data = true;
      this._collaboratorService
        .getDataloginCollaborator(this.id, this.token)
        .subscribe(
          (response) => {
            if (response.data != null) {
              this.collaborator = response.data;
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

  update(updateForm: any) {
    if (updateForm.valid) {
      this.btnUpdate = true;
      this._collaboratorService
        .updateCollaboratorAdmin(this.id, this.collaborator, this.token)
        .subscribe(
          (response) => {
            if (response && response.data) {
              this.showNotification('Colaborador se actualizó con éxito', 'success');
              this._router.navigate(['/collaborator']);
            } else {
              this.showNotification('Error al actualizar el colaborador', 'danger');
            }
            this.btnUpdate = false;
          },
          (error) => {
            this.showNotification('Error en la actualización: ' + error.message, 'danger');
            this.btnUpdate = false;
          }
        );
    } else {
      this.showNotification('Complete el formulario', 'danger');
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
