import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



//NGRX
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import { AddSeriesService } from '../../services/add-series.service';


import Swal from 'sweetalert2'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styles: [
  ]
})
export class AddSeriesComponent implements OnInit, OnDestroy {

  seriesForm:FormGroup;

  cargando:boolean = false;


  subscription:Subscription;

  faSpinner = faSpinner;


  image:any;

  constructor(
    private formBuilder:FormBuilder,
    private serieService:AddSeriesService,
    private store:Store<AppState>,
    private storage:AngularFireStorage
    ) { }

  ngOnInit(): void {

    this.createForm();

   this.subscription =  this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);

  }


  ngOnDestroy(){

    this.subscription.unsubscribe();
  }




  createForm = () => {

    this.seriesForm = this.formBuilder.group({

      titulo:      ["", Validators.required],
      stock:       ["", Validators.required],
      temporada:   ["", Validators.required],
      precioVenta: ["", Validators.required],
      descripcion: ["", Validators.required],
      img:         this.image

    });



  }

  guardar = async() => {

    if(this.seriesForm.invalid){return;}

    this.store.dispatch(ui.isLoading());

    await this.serieService.guardarSeries(this.seriesForm.value).then(resp => {

        console.log(resp);

        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: 'success',
          title: 'Serie guardada',
        })


        this.seriesForm.reset();
        
    }).catch( err => {

        this.store.dispatch(ui.stopLoading());

        Swal.fire({

          icon: 'error',
          title: 'Oops...',
          text: err,
        })
    })
    
    console.log(this.seriesForm.value);

    
  }



  uploadImg = (event:any) => {

    const file =  event.target.files[0];

    this.image = event.target.files[0].name;

    const filePath = "imagenes/";

    const ref = this.storage.ref(filePath + file.name);
    

    const task = ref.put(file);

    console.log('img', this.image);
    

  }

  validarCampos = (campo:string) => {

    if(this.seriesForm.get(`${campo}`)?.errors && this.seriesForm.get(`${campo}`)?.touched){

      return;
      
    }else{

      return false;
    }

  }

}
