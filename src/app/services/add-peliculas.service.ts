import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { PeliculaForm } from '../models/pelicuaForm';
import { Peliculas } from '../models/peliculas';

@Injectable({
  providedIn: 'root'
})
export class AddPeliculasService {

  constructor(private firestore:AngularFirestore) { }


  guardarPelicula = (peliculaForm:PeliculaForm) => {

    const {titulo, stock, precioAlquiler, precioVenta, descripcion, img} = peliculaForm;

    const id = new Date().getTime();
    
    const newPelicula = new Peliculas( id,titulo, stock, precioAlquiler, precioVenta, descripcion, img);


    return  this.firestore.doc(`peliculas/${id}`).set({...newPelicula});

  }


  obtenerPeliculas:any = () => {

    return this.firestore.collection('peliculas').valueChanges();
  }
}
