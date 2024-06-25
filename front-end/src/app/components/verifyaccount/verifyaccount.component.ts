import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyaccountComponent implements OnInit {

  public token = '';
  public load: boolean = false;
  public message = '';

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token:', this.token); // Añadir este log

      if (this.token) {

        this.clientService.verifyAccount(this.token).subscribe(
          response => {
            console.log('Response:', response); // Añadir este log

            if (response.data !== undefined) {
              this.message = 'Your account has been verified successfully. You can now login.';
            } else {
              this.message = response.message;
            }
            this.load = false;
            console.log('Message:', this.message); // Añadir este log
          },
          error => {
            console.error('Error:', error); // Añadir este log
            this.message = 'There was an error verifying your account. Please try again later.';
            this.load = false;
          }
        );
      } 
    });
  }

}
