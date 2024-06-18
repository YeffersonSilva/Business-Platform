import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
declare var $: any;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  public client: any = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    n_document: '',
    rol: '',
    gender: '',
    country: '',
    city: '',
    address: '',
    birth: '',
  };
  public btnRegister = false;

  public token: any = localStorage.getItem('token');

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  registerClient(registerForm: any) {
    this.btnRegister = true;
    if (registerForm.valid) {
      this.clientService.registerClientAdmin(this.client, this.token)
        .subscribe(
          response => {
            if (response == undefined || !response.data) {
              this.showNotification('Complete el formulario', 'danger');
            } else {
              setTimeout(() => {
                this.btnRegister = false;
              }, 3000);
              this.showNotification('Colaborador registrado con éxito', 'success');
              this.router.navigate(['/client']);
            }
          },
          error => {
            this.showNotification('Error en el registro: ' + error.message, 'danger');
          }
        );
      this.btnRegister = false;
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
