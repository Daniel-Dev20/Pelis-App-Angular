import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { PagesComponent } from './pages.component';




const pagesRoutes:Routes = [

   
    {path: '', component:PagesComponent},
    {path: 'home', component:PagesComponent},
    {path: 'peliculas', component:PeliculasComponent},
    {path: 'series', component:SeriesComponent},
    {path: '**', redirectTo: 'home'}


]

@NgModule({

    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})


export class PagesRouterModule{}