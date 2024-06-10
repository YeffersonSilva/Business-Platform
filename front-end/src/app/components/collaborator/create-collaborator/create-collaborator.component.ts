import { Component, OnInit } from '@angular/core';


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
    console.log(this.collaborator);
  }

}
