import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';




export const pagesRoutes:Routes = [

   
    {path: 'home', component:PagesComponent, canActivate:[AuthGuard]},
    {path: 'peliculas', component:PeliculasComponent, canActivate:[AuthGuard]},
    {path: 'series', component:SeriesComponent},


]

@NgModule({

    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})


export class PagesRouterModule{}