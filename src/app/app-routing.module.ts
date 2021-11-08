import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRouterModule, pagesRoutes } from './pages/pages.routes';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [

  {path: '', component:PagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: 
  [
    RouterModule,
    AuthRoutingModule,
    PagesRouterModule
  ]
})
export class AppRoutingModule { }
