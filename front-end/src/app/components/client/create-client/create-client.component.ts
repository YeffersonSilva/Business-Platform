import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
declare var $: any; // Declaration of jQuery for notifications

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  // Client object with its properties initialized
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
  public btnRegister = false; // Flag for the state of the register button
  public token: any = localStorage.getItem('token'); // Get the token from localStorage

  constructor(
    private clientService: ClientService, // Injecting the client service
    private router: Router // Injecting the router service
  ) { }

  ngOnInit(): void { }

  // Method to register the client
  registerClient(registerForm: any) {
    // Check if the form is invalid
    if (this.isFormInvalid(registerForm)) return;
    this.client.asesor = localStorage.getItem('_id'); // Set the advisor ID

    this.btnRegister = true; // Change the state of the register button to true
    // Call the service to register the client
    this.clientService.registerClientAdmin(this.client, this.token).subscribe(
      response => {
        if (!response || !response.data) {
          // Show a notification if the response is invalid
          this.showNotification('Complete el formulario', 'danger');
        } else {
          // Show a success notification and navigate to the client page
          this.showNotification('Cliente registrado con éxito', 'success');
          this.router.navigate(['/client']);
        }
        this.btnRegister = false; // Change the state of the register button to false
      },
      error => {
        // Show an error notification if there is an issue during registration
        this.showNotification('Error en el registro: ' + error.message, 'danger');
        this.btnRegister = false; // Change the state of the register button to false
      }
    );
  }

  // Method to check if the form is invalid
  private isFormInvalid(registerForm: any): boolean {
    // List of required fields with their error messages
    const fields = [
      { name: 'name', message: 'Complete los nombres del cliente.' },
      { name: 'surname', message: 'Complete los apellidos del cliente.' },
      { name: 'email', message: 'Complete el email del cliente.' },
      { name: 'gender', message: 'Seleccione el género del cliente.' },
      { name: 'phone', message: 'Ingrese el teléfono del cliente.' },
    ];

    // Iterate over the fields and check if any are empty
    for (const field of fields) {
      if (!registerForm.value[field.name]) {
        // Show a notification if the field is empty
        this.showNotification(field.message, 'danger');
        return true;
      }
    }
    return false; // Return false if all fields are complete
  }

  // Method to show notifications
  private showNotification(message: string, type: string) {
    // Use jQuery to show a notification
    $.notify(message, {
      type: type, // Type of notification (success, danger, etc.)
      spacing: 10, // Spacing between notifications
      timer: 2000, // Duration of the notification
      placement: {
        from: 'top', // Position of the notification (top, bottom, etc.)
        align: 'right', // Alignment of the notification (left, right, etc.)
      },
      delay: 1000, // Delay before the notification appears
      animate: {
        enter: 'animated bounce', // Animation on enter
        exit: 'animated bounce', // Animation on exit
      },
    });
  }
}
