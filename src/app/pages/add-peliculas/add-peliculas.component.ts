import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPeliculasService } from 'src/app/services/add-peliculas.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'


import Swal from 'sweetalert2'

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import *  as ui from '../../shared/ui.actions';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-add-peliculas',
  templateUrl: './add-peliculas.component.html',
  styles: [
  ]
})
export class AddPeliculasComponent implements OnInit, OnDestroy {

  peliculasForm:FormGroup;

  image:any;

  submmited:any = true;

  cargando:boolean = false;

  
  faSpinner = faSpinner;
  
  
  url:string;

  
  subscription:Subscription;

  constructor(
    private formBuilder:FormBuilder,
    private peliculaService:AddPeliculasService,
    private storage:AngularFireStorage,
    private store:Store<AppState>
    ) {

    this.createForm();

    this.subscription = this.store.select('ui').subscribe( ui => {

      this.cargando  = ui.isLoading;
    })

   }

  ngOnInit(): void {


  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }


  uploadImg = async(event:any) => {

    console.log('evento', event);
    const file  = event.target.files[0];
    
    const filePath = 'imagenes/';
    const ref = this.storage.ref(filePath + file.name);
    const task = ref.put(file)



    console.log('task', task);
    

      ref.getDownloadURL().subscribe( async(resp) => {

       this.url = await resp;
      
      console.log('url', this.url);
      
    })

    setTimeout(() => {
      
      console.log('url', this.url);

    }, 3000)

    
    
    
    
    

  }

  createForm = () => {

      this.peliculasForm = this.formBuilder.group({
        titulo:         ["", Validators.required],
        stock:          ["", [Validators.required, Validators.minLength(0)]],
        precioAlquiler: ["", Validators.required],
        precioVenta:    ["", Validators.required],
        descripcion:    ["", Validators.required],
        img:            this.url
      })
  }


  guardar = () => {

    if(this.peliculasForm.invalid){return;}

    console.log(this.peliculasForm.value);

    this.store.dispatch(ui.isLoading());

    this.peliculaService.guardarPelicula(this.peliculasForm.value).then( resp => {

      console.log(resp);

        this.store.dispatch(ui.stopLoading());

      Swal.fire({
        icon: 'success',
        title: 'Pelicula Guardada',
        showConfirmButton: false,
        timer: 2000
      }).catch(  err => {

        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: 'error',
          title: err,
          text: 'Error al Guardar Pelicula', 
        })

      })

    })
     

    this.peliculasForm.reset();
    
  }




  validarCampos = (campo:string) => {

    if(
      this.peliculasForm.get(`${campo}`).errors 
      && this.peliculasForm.get(`${campo}`).touched
      && this.submmited
      ){

         return true;

      }else{

        return false;
      }

  }

}
