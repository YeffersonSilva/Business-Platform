import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from 'src/app/services/collaborator.service';
declare var $: any;
@Component({
  selector: 'app-index-collaborator',
  templateUrl: './index-collaborator.component.html',
  styleUrls: ['./index-collaborator.component.css']
})
export class IndexCollaboratorComponent implements OnInit {

  public token= localStorage.getItem('token');

  constructor(
    private _collaboratorService: CollaboratorService,
    

  ) { }

  ngOnInit(): void {
  }


  init_data() {
    this._collaboratorService.getCollaborators(this.token).subscribe(
      response => {
        if (response == undefined || !response.data) {
          this.showNotification('Error al cargar los colaboradores', 'danger');
        } else {
          this.collaborators = response.data;
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
}
