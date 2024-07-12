import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
declare var $: any;

@Component({
  selector: 'app-call-client',
  templateUrl: './call-client.component.html',
  styleUrls: ['./call-client.component.css']
})
export class CallClientComponent implements OnInit {
  public id = '';
  public call: any = {
    result: '',
    date: '',
    note: '',
    hour: ''
  };
  public time = { hour: 13, minute: 30 };
  public bntLoad = false;
  public token: string | null = localStorage.getItem('token');
  public calls: Array<any> = [];
  public page = 1;
  public pageSize = 10;

  public data = false;
  public loadData = true;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    // Get client ID from route parameters
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.clientService.getClientCallsProsperccion(this.id, this.token).subscribe(
        response => {
          if (response.data !== undefined) {
            this.data = true;
            this.loadData = false;
            this.initData();
          } else {
            this.data = false;
            this.loadData = false;
          }
        },
        error => {
          console.error(error);
          this.data = false;
          this.loadData = false;
        }
      );
    });
  }

  // Initialize call data
  initData(): void {
    this.clientService.getClientCallsProsperccion(this.id, this.token).subscribe(
      response => {
        this.calls = response.data;
      },
      error => {
        console.error(error);
      }
    );
  }

  // Register a new call
  registerCall(): void {
    if (this.time) {
      this.call.hour = `${this.time.hour}:${this.time.minute}`;
    }

    if (!this.call.date || !this.call.hour || !this.call.result) {
      this.showNotification('Please fill out all fields correctly', 'danger');
      return;
    }

    this.bntLoad = true;
    this.call.client = this.id;
    this.call.asesor = localStorage.getItem('_id');

    this.clientService.createClientCallProsperccion(this.call, this.token).subscribe(
      response => {
        $('#modalLlamada').modal('hide');
        this.showNotification('Call registered successfully', 'success');
        this.bntLoad = false;
        this.initData(); // Refresh the list after registering a call
      },
      error => {
        this.showNotification('Error registering call', 'danger');
        this.bntLoad = false;
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
