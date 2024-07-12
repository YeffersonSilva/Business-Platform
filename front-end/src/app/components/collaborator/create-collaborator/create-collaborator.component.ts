import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
declare var $: any;

@Component({
  selector: 'app-create-collaborator',
  templateUrl: './create-collaborator.component.html',
  styleUrls: ['./create-collaborator.component.css'],
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
    country: '',
  };
  public btnRegister = false;
  public token: string | null = localStorage.getItem('token');

  constructor(
    private collaboratorService: CollaboratorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Function to register a new collaborator
  registerCollaborator(registerForm: any): void {
    this.btnRegister = true;
    if (registerForm.valid) {
      console.log(this.collaborator); // For debugging

      this.collaboratorService.updateCollaborator(this.collaborator, this.token).subscribe(
        (response) => {
          if (!response || !response.data) {
            this.showNotification('Please complete the form', 'danger');
          } else {
            this.showNotification('Collaborator registered successfully', 'success');
            this.router.navigate(['/collaborator']);
          }
          this.btnRegister = false;
        },
        (error) => {
          this.showNotification('Registration error: ' + error.message, 'danger');
          this.btnRegister = false;
        }
      );
    } else {
      this.showNotification('Please complete the form', 'danger');
      this.btnRegister = false;
    }
  }

  // Function to show notifications
  private showNotification(message: string, type: string): void {
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
