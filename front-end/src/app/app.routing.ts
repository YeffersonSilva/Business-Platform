import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { IndexCollaboratorComponent } from './components/collaborator/index-collaborator/index-collaborator.component';
import { CreateCollaboratorComponent } from './components/collaborator/create-collaborator/create-collaborator.component';
import { EditCollaboratorComponent } from './components/collaborator/edit-collaborator/edit-collaborator.component';
import { IndexClientComponent } from './components/client/index-client/index-client.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { VerifyaccountComponent } from './components/verifyaccount/verifyaccount.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'collaborator', component: IndexCollaboratorComponent },
  { path: 'collaborator/create', component: CreateCollaboratorComponent },
  { path: 'collaborator/:id', component: EditCollaboratorComponent },

  { path: 'client', component: IndexClientComponent },
  { path: 'client/create', component: CreateClientComponent },
  { path: 'client/:id', component: EditClientComponent },

  { path: 'verification/:token', component: VerifyaccountComponent },

  { path: '', component: LoginComponent },

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
