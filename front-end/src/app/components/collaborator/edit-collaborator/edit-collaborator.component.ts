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
  public token: string | null = localStorage.getItem('token');
  public load_data = false;
  public data = false;

  constructor(
    private collaboratorService: CollaboratorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get the collaborator ID
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.load_data = true;

      // Fetch collaborator data
      this.collaboratorService.getDataloginCollaborator(this.id, this.token).subscribe(
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

  // Function to update collaborator details
  update(updateForm: any): void {
    if (updateForm.valid) {
      this.btnUpdate = true;

      // Update collaborator data
      this.collaboratorService.updateCollaboratorAdmin(this.id, this.collaborator, this.token).subscribe(
        (response) => {
          if (response && response.data) {
            this.showNotification('Collaborator updated successfully', 'success');
            this.router.navigate(['/collaborator']);
          } else {
            this.showNotification('Error updating collaborator', 'danger');
          }
          this.btnUpdate = false;
        },
        (error) => {
          this.showNotification('Update error: ' + error.message, 'danger');
          this.btnUpdate = false;
        }
      );
    } else {
      this.showNotification('Please complete the form', 'danger');
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
