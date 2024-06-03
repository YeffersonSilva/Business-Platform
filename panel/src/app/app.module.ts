import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent, // Importar el componente standalone
    DashboardComponent // Importar el componente standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
