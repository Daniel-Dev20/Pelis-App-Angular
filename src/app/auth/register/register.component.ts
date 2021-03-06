import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';


//FONTAWESOME
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


//SWEETALERT
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registroForm:FormGroup;

  public formSubmitted:false;

  public cargando:boolean = false;

  public uiSubscription:Subscription;

  public faSpinner = faSpinner;

  constructor(
    private formBuilder:FormBuilder,

    private authService:AuthService,

    private store:Store<AppState>,

    private router: Router

    ) {


   }

  ngOnInit(): void {

    this.registroForm = this.formBuilder.group({

      nombre: ["", [Validators.required, Validators.minLength(3)]],

      correo: ["", [Validators.required, Validators.email]],

      password: ["", [Validators.required, Validators.minLength(6)]],

      role: ["", Validators.required]

    });


    this.uiSubscription =  this.store.select('ui').subscribe(ui => {

      this.cargando = ui.isLoading;

      console.log('cargando subs');
      
    });

  }

  ngOnDestroy(){

    this.uiSubscription.unsubscribe();
  }

  guardar = () => {

    if(this.registroForm.invalid){return;}


    this.store.dispatch(ui.isLoading());

    this.authService.crearUsuario(this.registroForm.value).then(credenciales => {

      console.log(credenciales);

      this.store.dispatch(ui.stopLoading());

      this.router.navigateByUrl('/home')
      
    }).catch(err => {

      this.store.dispatch(ui.stopLoading());

      Swal.fire({

        
        icon: 'error',
        title: err,
        text: 'Error al iniciar Sesi??n',
      
      })

    })

    
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
