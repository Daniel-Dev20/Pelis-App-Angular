import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [

    PagesComponent,
    PeliculasComponent,
    SeriesComponent,
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule 
  ]
})
export class PagesModule { }
