import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm:FormGroup;

  formSubmitted:false;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router: Router
    ) {

    this.registroForm = this.formBuilder.group({

      nombre: ["", [Validators.required, Validators.minLength(3)]],
      correo: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]

    })

   }

  ngOnInit(): void {
  }

  guardar = () => {

    if(this.registroForm.invalid){return;}

    this.authService.crearUsuario(this.registroForm.value).then(credenciales => {

      console.log(credenciales);

      this.router.navigateByUrl('/home')
      
    }).catch(err => console.log(err))

    
    this.registroForm.reset();
    
  }

  validarCampos = (campo:string) => {

    if(this.registroForm.get(`${campo}`)?.errors && this.registroForm.get(`${campo}`)?.touched){

      return true;

    }else{

      return false;
    }

  }

}
