import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';

//FONTAWESOME
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { AddUsuariosComponent } from './add-usuarios/add-usuarios.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AddUsuariosComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    
  ]
})
export class AuthModule { }
