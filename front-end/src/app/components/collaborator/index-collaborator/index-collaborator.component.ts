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

  constructor(private _collaboratorService: CollaboratorService) { }

  ngOnInit(): void {
    this.init_data();
  }

  // Function to initialize data
  init_data(): void {
    this._collaboratorService.getCollaborators(this.token).subscribe(
      response => {
        if (!response || !response.data) {
          this.showNotification('Error loading collaborators', 'danger');
        } else {
          this.collaborators = response.data;
          this.collaborators_const = [...this.collaborators]; // Use spread operator to clone array
        }
      },
      error => {
        this.showNotification('Error loading collaborators: ' + error.message, 'danger');
      }
    );
  }

  // Function to show notifications
  private showNotification(message: string, type: string): void {
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

  // Function to filter collaborators based on the input
  filtrar(): void {
    if (this.filtro) {
      const term = new RegExp(this.filtro, 'i');
      this.collaborators = this.collaborators_const.filter(item =>
        term.test(item.name) || term.test(item.lastname) || term.test(item.email)
      );
    } else {
      this.collaborators = [...this.collaborators_const]; // Reset to the original list
    }
  }

  // Function to change the state of a collaborator
  set_state(id: any, currentState: any): void {
    const newState = !currentState;
    this.loadState = true; // Show the spinner

    this._collaboratorService.setState(id, { state: newState }, this.token).subscribe(
      response => {
        $('#delete-' + id).modal('hide');
        this.loadState = false; // Hide the spinner
        this.init_data(); // Reload the data
      },
      error => {
        this.loadState = false; // Hide the spinner in case of error
        this.showNotification('Error changing state: ' + error.message, 'danger');
      }
    );
  }
}
