import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClientService } from 'src/app/services/client.service';
import { CollaboratorService } from 'src/app/services/collaborator.service';
declare var $: any;

@Component({
  selector: 'app-task-client',
  templateUrl: './task-client.component.html',
  styleUrls: ['./task-client.component.css'],
})
export class TaskClientComponent implements OnInit {
  public id = '';
  public token = localStorage.getItem('token');
  public data = false;
  public loadData = true;
  public btnTask = false;
  public page = 1;
  public pageSize = 5;
  public task: any = {
    asesor: '',
    type: '',
    priority: '',
    task: '',
    hour: ''
  };
  public tasks: Array<any> = [];
  public asesor: Array<any> = [];
  public time = { hour: 13, minute: 30 };
  public dates = GLOBAL.dates;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private collaboratorService: CollaboratorService
  ) {}

  ngOnInit(): void {
    // Get client ID from route parameters
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.clientService.getClientCallsProsperccion(this.id, this.token).subscribe((response) => {
        if (response.data !== undefined) {
          this.data = true;
          this.loadData = false;
          this.initAsesor();
          this.initData();
        } else {
          this.data = false;
          this.loadData = false;
        }
      });
    });
  }

  // Initialize list of advisors
  initAsesor(): void {
    this.collaboratorService.getCollaborators(this.token).subscribe(
      (response) => {
        this.asesor = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Initialize task data
  initData(): void {
    this.clientService.getClientTaskProsperccion(this.id, this.token).subscribe(
      (response) => {
        this.tasks = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Register a new task
  registerTask(): void {
    if (this.time) {
      this.task.hour = `${this.time.hour}:${this.time.minute}`;
    }

    if (!this.task.asesor || !this.task.type || !this.task.priority || !this.task.task) {
      this.showNotification('Please fill out all fields correctly', 'danger');
      return;
    }

    this.btnTask = true;
    this.task.client = this.id;
    this.task.asesor = localStorage.getItem('_id');

    this.clientService.createClientTaskProsperccion(this.task, this.token).subscribe(
      (response) => {
        $('#modalTarea').modal('hide');
        this.task = {
          asesor: '',
          type: '',
          priority: '',
          task: '',
          hour: ''
        };
        this.showNotification('Task registered successfully', 'success');
        this.btnTask = false;
        this.initData(); // Refresh the list after registering a task
      },
      (error) => {
        this.showNotification('Error registering task', 'danger');
        this.btnTask = false;
      }
    );
  }

  // Show notifications
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
