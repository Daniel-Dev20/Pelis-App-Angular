import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';


//FONTAWESOME 
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';




//SWEETALERT
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm:FormGroup;

  public cargando:boolean = false;

  public uiSubscription:Subscription;

  public faSpinner = faSpinner;

  public faCheck = faCheckCircle;


  constructor(

    private formBuilder:FormBuilder,

    private authService:AuthService,

    private store:Store<AppState>,

    private router:Router

    ) { 

   

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      correo: ["test1@gmail.com", [Validators.required, Validators.email]],

      password: ["123456", [Validators.required, Validators.minLength(6)]]

    });


    this.uiSubscription = this.store.select('ui').subscribe(ui =>  {

      this.cargando = ui.isLoading

      console.log(' cargando subs');
      
     });
  }

  ngOnDestroy(){

    this.uiSubscription.unsubscribe();
  }

  login = () => {

    if(this.loginForm.invalid){return;}    
    
    this.store.dispatch(ui.isLoading());

    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).then(credenciales => {
       
      console.log(credenciales);


      this.store.dispatch(ui.stopLoading());

      this.router.navigateByUrl('/home')
       
    }).catch(err => {

      this.store.dispatch(ui.stopLoading());
  
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
