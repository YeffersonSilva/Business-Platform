import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any = {
    email: '',
    password: '',
  };
  public token: any= localStorage.getItem('token');

  constructor(
    private _collaboratorService: CollaboratorService,
    private router: Router

  ) { }

  ngOnInit(): void {
    if(this.token){
      this.router.navigate(['/dashboard']);
    }

  }

  login() {
      if (!this.user.email) {
        $.notify('You must enter the email', {
          type: 'danger',
          spacing: 10,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'right',
          },
          delay: 1000,
          animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce',
          },
        });
      } else if (!this.user.password) {
        $.notify('You must enter the password', {
          type: 'danger',
          spacing: 10,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'right',
          },
          delay: 1000,
          animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce',
          },
        });
      } else {
        this._collaboratorService.loginCollaboratorAdmin(this.user).subscribe(
          response => {
            console.log(response);
            if (response.data == undefined) {
              $.notify(response.message, {
                type: 'danger',
                spacing: 10,
                timer: 2000,
                placement: {
                  from: 'top',
                  align: 'right',
                },
                delay: 1000,
                animate: {
                  enter: 'animated ' + 'bounce',
                  exit: 'animated ' + 'bounce',
                }
              });
            }
            else {
              localStorage.setItem('token', response.token);
              localStorage.setItem('user', JSON.stringify(response.data));
              localStorage.setItem('_id', response.data._id);
              this.router.navigate(['/dashboard']);

            }
          }
        );
      }
    }
}
