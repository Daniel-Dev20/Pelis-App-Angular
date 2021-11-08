import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPeliculasService } from 'src/app/services/add-peliculas.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'


import Swal from 'sweetalert2'

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import *  as ui from '../../shared/ui.actions';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


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

  subscription:Subscription;

  faSpinner = faSpinner;

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

  createForm = () => {

      this.peliculasForm = this.formBuilder.group({
        titulo:         ["", Validators.required],
        stock:          ["", [Validators.required, Validators.minLength(0)]],
        precioAlquiler: ["", Validators.required],
        precioVenta:    ["", Validators.required],
        descripcion:    ["", Validators.required],
        img:            this.image
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


  uploadImg = (event:any) => {

    console.log('evento', event);
    const file  = event.target.files[0];
    // const urlTemporal=URL.createObjectURL(file.name)
    
    const filePath = 'imagenes/';
    const ref = this.storage.ref(filePath + file.name);
    const task = ref.put(file);
    this.image = ref.getDownloadURL();
    console.log('url', this.image);

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
