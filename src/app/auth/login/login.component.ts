import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
    ) { 

    this.loginForm = this.formBuilder.group({

      correo: ["test1@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  login = () => {

    if(this.loginForm.invalid){return;}    
    
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).then(credenciales => {
       
      console.log(credenciales);

      this.router.navigateByUrl('/home')
       
    }).catch(err => {

  
      Swal.fire({
        icon: 'error',
        title: err,
        text: 'Error al iniciar Sesión',
      
      })
    })

    this.loginForm.reset();
    
  }


  validarCampos = (campo:string) => {

    if(this.loginForm.get(`${campo}`)?.errors && this.loginForm.get(`${campo}`)?.touched){

      return true;

    }else{

      return false;
    }

  }

}
