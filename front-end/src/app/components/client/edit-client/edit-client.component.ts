import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
declare var $: any;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  public client: any = {


    gender: '',
    country: '',

  };
  public btnUpdate = false; // Flag for the state of the register button
  public token: any= localStorage.getItem('token'); // Get the token from localStorage
  public id = '';
  public load_data = true;
  public data = false;

  constructor(
    private _router: ActivatedRoute,
    private clientService: ClientService, // Injecting the client service
    private route : Router

  ) { }

  ngOnInit(): void {
    this._router.params.subscribe((params) => {
      this.id = params['id'];
      this.load_data = true;
      this.clientService
        .getDataloginClient(this.id, this.token)
        .subscribe(
          (response) => {
            if (response.data != undefined) {
              this.client = response.data;
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

  updateClient(updateForm: any) {
    if (updateForm.valid) {
      this.btnUpdate = true;
      this.clientService
        .updateClientAdmin(this.id, this.client, this.token)
        .subscribe(
          (response) => {
            if (response.data != undefined) {
              this.showNotification('Cliente se actualizó con éxito', 'success');
              this.route.navigate(['/client']);
            } else {
              this.showNotification('Error al actualizar el Cliente', 'danger');
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
