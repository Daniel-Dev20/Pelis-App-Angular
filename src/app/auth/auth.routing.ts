import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';




const AuthRoutes:Routes = [

    {path: 'login', component:LoginComponent},
    {path: 'registro', component:RegisterComponent}

]

@NgModule({

    imports: [RouterModule.forRoot(AuthRoutes)],
    exports:[RouterModule]
})

export class AuthRoutingModule {}