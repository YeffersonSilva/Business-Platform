import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
declare var $: any;

@Component({
  selector: 'app-create-collaborator',
  templateUrl: './create-collaborator.component.html',
  styleUrls: ['./create-collaborator.component.css']
})
export class CreateCollaboratorComponent implements OnInit {
  public collaborator: any = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    n_document: '',
    rol: '',
    gender: '',
    country: ''
  };
  public btnRegister = false;
  public token: any= localStorage.getItem('token');

  constructor(
    private _collaboratorService: CollaboratorService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  registerCollaborator(registerForm: any) {
    this.btnRegister = true;
    if (registerForm.valid) {
      this.btnRegister = true;

      console.log(this.collaborator); // Para depuración
      this._collaboratorService.registerCollaboratorAdmin(this.collaborator, this.token).subscribe(
        response => {
          if (response == undefined || !response.data) {
            this.showNotification('Complete el formulario', 'danger');
          } else { setTimeout(() => {
            this.btnRegister = false;
          },3000);
            this.showNotification('Colaborador registrado con éxito', 'success');
            this._router.navigate(['/collaborator']);
          }
        },
        error => {
          this.showNotification('Error en el registro: ' + error.message, 'danger');
        }
      );    this.btnRegister = false;

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
        align: 'right'
      },
      delay: 1000,
      animate: {
        enter: 'animated bounce',
        exit: 'animated bounce'
      }
    });
  }
}
