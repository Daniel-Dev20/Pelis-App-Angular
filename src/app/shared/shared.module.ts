import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagesRouterModule } from '../pages/pages.routes';
import { PagesModule } from '../pages/pages.module';
import { AuthRoutingModule } from '../auth/auth.routing';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  exports: [

    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PagesRouterModule,
    AuthRoutingModule
  ]
})
export class SharedModule { }
