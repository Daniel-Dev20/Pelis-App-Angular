import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { PagesRouterModule } from './pages.routes';
import { AuthRoutingModule } from '../auth/auth.routing';



@NgModule({
  declarations: [

    PagesComponent,
    PeliculasComponent,
    SeriesComponent,
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRouterModule,
    AuthRoutingModule
  ]
})
export class PagesModule { }
