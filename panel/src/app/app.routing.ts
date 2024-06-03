import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
  {path: 'deashboard', component: DashboardComponent},

]


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
