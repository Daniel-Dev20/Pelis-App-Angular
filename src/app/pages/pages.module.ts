import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRouterModule } from './pages.routes';
import { AuthRoutingModule } from '../auth/auth.routing';
import { AddPeliculasComponent } from './add-peliculas/add-peliculas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddSeriesComponent } from './add-series/add-series.component';


@NgModule({
  declarations: [

    PagesComponent,
    PeliculasComponent,
    SeriesComponent,
    AddPeliculasComponent,
    AddSeriesComponent,
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRouterModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class PagesModule { }
