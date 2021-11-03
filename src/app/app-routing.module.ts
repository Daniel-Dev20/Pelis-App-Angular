import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRouterModule, pagesRoutes } from './pages/pages.routes';

const routes: Routes = [

  
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
