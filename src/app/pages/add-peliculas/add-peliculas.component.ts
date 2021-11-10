import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPeliculasService } from 'src/app/services/add-peliculas.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'




//NGRX
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import *  as ui from '../../shared/ui.actions';

//LIBRERIA DE ICONOS DE FONTAWESOME
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

//LIBRERIA DE SWEETALERT PARA NOTIFICACIONES
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-peliculas',
  templateUrl: './add-peliculas.component.html',
  styles: [
  ]
})
export class AddPeliculasComponent implements OnInit, OnDestroy {

  public peliculasForm: FormGroup;

  public image: string;

  public cargando: boolean = false;


  public faSpinner = faSpinner;


  public url: any;


  public subscription: Subscription;


  constructor(

    private formBuilder: FormBuilder,

    private peliculaService: AddPeliculasService,

    private storage: AngularFireStorage,

    private store: Store<AppState>
  ) {


    this.subscription = this.store.select('ui').subscribe(ui => {

         this.cargando = ui.isLoading;

    })

    this.createForm();


  }

  ngOnInit(): void {



   }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }

  //FUNCION PARA OBTENER IMAGEN Y SUBIRLA AL STORAGE

  uploadImg =  async(event: any) => {


      console.log('evento', event)

      const file = event.target.files[0];
  
      const filePath = 'imagenes/';
  
      const ref =  await this.storage.ref(filePath + file.name);
  
      const task = ref.put(file)
  

      const urlRef = await ref.getDownloadURL().toPromise().then(resp => {

        this.url = resp

        console.log('url', this.url);

      }).catch(err => {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        })

      })
      
      this.peliculasForm.setValue({img:this.url})
      
      console.log('url despues de await', this.url);  
      
      
      
    }
    

  //DECLARAR FORMULARIO
  createForm = () => {

    this.peliculasForm = this.formBuilder.group({

      titulo:         ["", Validators.required],

      stock:          ["", [Validators.required, Validators.minLength(0)]],

      precioAlquiler: ["", Validators.required],

      precioVenta:    ["", Validators.required],
      
      descripcion:    ["", Validators.required],

      img:            [this.url]
      
    })

    console.log('url fuera', this.url);  

  }

  //ENVIAR DATOS PARA GUARDAR DATOS DEL FORMULARIO

  guardar = () => {

    if (this.peliculasForm.invalid) { return; }

    console.log(this.url);

    this.store.dispatch(ui.isLoading());

     this.peliculaService.guardarPelicula({...this.peliculasForm.value, img:this.url}).then(resp => {


      this.store.dispatch(ui.stopLoading());

      Swal.fire({
        
        icon: 'success',
        title: 'Pelicula Guardada',
        showConfirmButton: false,
        timer: 2000

      }).catch(err => {
        
        Swal.fire({
          icon: 'error',
          title: err,
          text: 'Error al Guardar Pelicula',
        });
        
        this.store.dispatch(ui.stopLoading());

      });

    });


    this.peliculasForm.reset();


  }

  //VALIDAR CAMPOS

  validarCampos = (campo: string) => {

    if (
      this.peliculasForm.get(`${campo}`).errors
      && this.peliculasForm.get(`${campo}`).touched
    ) {

      return true;

    } else {

      return false;
    }

  }

}
