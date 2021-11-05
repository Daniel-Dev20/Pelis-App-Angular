import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPeliculasService } from 'src/app/services/add-peliculas.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'



@Component({
  selector: 'app-add-peliculas',
  templateUrl: './add-peliculas.component.html',
  styles: [
  ]
})
export class AddPeliculasComponent implements OnInit {

  peliculasForm:FormGroup;

  img:any;

  constructor(
    private formBuilder:FormBuilder,
    private peliculaService:AddPeliculasService,
    private storage:AngularFireStorage
    ) {

    this.createForm();

   }

  ngOnInit(): void {
  }

  createForm = () => {

      this.peliculasForm = this.formBuilder.group({
        titulo:         ["", Validators.required],
        stock:          ["", Validators.required],
        precioAlquiler: ["", Validators.required],
        precioVenta:    ["", Validators.required],
        descripcion:    ["", Validators.required],
        img:            [this.img, Validators.required]
      })
  }


  guardar = () => {

    console.log(this.peliculasForm.value);

    this.peliculaService.guardarPelicula(this.peliculasForm.value);

    this.peliculasForm.reset();
    
  }


  uploadImg = (event:any) => {

    const file  = event.target.files[0];
    // const urlTemporal=URL.createObjectURL(file.name)
    this.img = event.target.files[0].name;
    const filePath = 'imagenes/';
    const ref = this.storage.ref(filePath + file.name);
    const task = ref.put(file);

  }

 

}
