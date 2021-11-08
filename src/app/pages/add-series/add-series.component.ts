import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddSeriesService } from '../../services/add-series.service';


@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styles: [
  ]
})
export class AddSeriesComponent implements OnInit {

  seriesForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private serieService:AddSeriesService
    ) { }

  ngOnInit(): void {

    this.createForm();
  }

  createForm = () => {

    this.seriesForm = this.formBuilder.group({

      titulo: ["", Validators.required],
      stock: ["", Validators.required],
      temporada: ["", Validators.required],
      precioVenta: ["", Validators.required],
      descripcion: ["", Validators.required],
      img: [""]

    })
  }

  guardar = () => {

    if(this.seriesForm.invalid){return;}

    this.serieService.guardarSeries(this.seriesForm.value)
    
    console.log(this.seriesForm.value);

    
  }

  validarCampos = (campo:string) => {

    if(this.seriesForm.get(`${campo}`)?.errors && this.seriesForm.get(`${campo}`)?.touched){

      return;
      
    }else{

      return false;
    }

  }

}
