import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; // Asegurarse de que CommonModule está importado
import { NgxTinymceModule } from 'ngx-tinymce';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { routing } from './app.routing';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TopComponent } from './components/top/top.component';
import { IndexCollaboratorComponent } from './components/collaborator/index-collaborator/index-collaborator.component';
import { CreateCollaboratorComponent } from './components/collaborator/create-collaborator/create-collaborator.component';
import { EditCollaboratorComponent } from './components/collaborator/edit-collaborator/edit-collaborator.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { IndexClientComponent } from './components/client/index-client/index-client.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { VerifyaccountComponent } from './components/verifyaccount/verifyaccount.component';
import { DeshboardClientComponent } from './components/buyer/deshboard-client/deshboard-client.component';
import { ProspeccionClientComponent } from './components/buyer/prospeccion-client/prospeccion-client.component';
import { AsideClientComponent } from './components/buyer/aside-client/aside-client.component';
import { InterestClientComponent } from './components/buyer/properccion/interest-client/interest-client.component';
import { TaskClientComponent } from './components/buyer/properccion/task-client/task-client.component';
import { CallClientComponent } from './components/buyer/properccion/call-client/call-client.component';
import { EmailClientComponent } from './components/buyer/properccion/email-client/email-client.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    TopComponent,
    IndexCollaboratorComponent,
    CreateCollaboratorComponent,
    EditCollaboratorComponent,
    NotfoundComponent,
    IndexClientComponent,
    CreateClientComponent,
    EditClientComponent,
    VerifyaccountComponent,
    DeshboardClientComponent,
    ProspeccionClientComponent,
    AsideClientComponent,
    InterestClientComponent,
    TaskClientComponent,
    CallClientComponent,
    EmailClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'client', component: IndexClientComponent },
      { path: 'collaborator', component: IndexCollaboratorComponent },
      // otras rutas
    ]),
    routing,
    CommonModule, // Asegurarse de que CommonModule esté en el array de imports
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModule,
    NgxTinymceModule.forRoot({
      // Local assets
      baseURL: '../../../assets/tinymce/',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
