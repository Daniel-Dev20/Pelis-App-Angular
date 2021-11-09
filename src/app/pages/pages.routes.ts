import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';



import { AuthGuard } from '../guards/auth.guard';
import { AddPeliculasComponent } from './add-peliculas/add-peliculas.component';
import { AddSeriesComponent } from './add-series/add-series.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';



export const pagesRoutes:Routes = [

   
  {path: 'home', component:PagesComponent},
  {path: 'peliculas', component:PeliculasComponent, pathMatch: 'full'},
  {path: 'series', component:SeriesComponent},
  {path: 'add-peliculas', component:AddPeliculasComponent},
  {path: 'add-series', component:AddSeriesComponent}
  


]

@NgModule({

    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})


export class PagesRouterModule{}