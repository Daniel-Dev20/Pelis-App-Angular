import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { seriesForm } from '../models/seriesForm';
import { Series } from '../models/series.model';

@Injectable({
  providedIn: 'root'
})
export class AddSeriesService {

  constructor(private firestore:AngularFirestore) { }

  guardarSeries = (series:seriesForm) =>{

    const {titulo, stock, temporada, precioVenta, descripcion, img } = series;

    const id = new Date().getTime();

    const newSerie = new Series(id,titulo, stock, temporada, precioVenta, descripcion, img);

    return this.firestore.doc(`series/${id}`).set({...newSerie});

  }

  obtenerSeries = () => {

    return this.firestore.collection('series').valueChanges();
  }
}
