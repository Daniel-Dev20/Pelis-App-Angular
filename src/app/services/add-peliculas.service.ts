import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PeliculaForm } from '../models/pelicuaForm';
import { Peliculas } from '../models/peliculas';

@Injectable({
  providedIn: 'root'
})
export class AddPeliculasService {

  constructor(private firestore:AngularFirestore) { }


  guardarPelicula = (peliculaForm:PeliculaForm) => {

    const {titulo, stock, precioAlquiler, precioVenta, descripcion, img} = peliculaForm;

    console.log(peliculaForm);
    const id = new Date().getTime();
    const newPelicula = new Peliculas( id,titulo, stock, precioAlquiler, precioVenta, descripcion, img);


    this.firestore.doc(`peliculas/${id}`).set({...newPelicula});

  }


  obtenerPeliculas = () => {

    return this.firestore.collection('peliculas').valueChanges();
  }
}
