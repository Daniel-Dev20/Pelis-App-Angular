import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { AddPeliculasComponent } from './add-peliculas/add-peliculas.component';
import { AddSeriesComponent } from './add-series/add-series.component';




export const pagesRoutes:Routes = [

   
    {path: 'home', component:PagesComponent},
    {path: 'peliculas', component:PeliculasComponent, canActivate:[AuthGuard]},
    {path: 'series', component:SeriesComponent, canActivate: [AuthGuard]},
    {path: 'add-peliculas', component:AddPeliculasComponent, canActivate:[AuthGuard]},
    {path: 'add-series', component:AddSeriesComponent, canActivate: [AuthGuard]}


]

@NgModule({

    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})


export class PagesRouterModule{}