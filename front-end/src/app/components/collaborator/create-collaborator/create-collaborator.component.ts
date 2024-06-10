import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-create-collaborator',
  templateUrl: './create-collaborator.component.html',
  styleUrls: ['./create-collaborator.component.css']
})
export class CreateCollaboratorComponent implements OnInit {
  public collaborator: any = {
    gender: '',
    rol: '',
    country: ''

  }

  constructor() { }

  ngOnInit(): void {
  }

  registerCollaborator(registerForm:any) {

    if (registerForm.valid) {
      console.log(this.collaborator);
    } else {
      $.notify('Complete el formulario', {
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
    }

  }

}
