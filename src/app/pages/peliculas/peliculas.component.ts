import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AddPeliculasService } from 'src/app/services/add-peliculas.service';
import * as pelis from '../peliculas.actions';
import { setPelicula } from '../peliculas.actions';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [
  ]
})
export class PeliculasComponent implements OnInit, OnDestroy {

  peliculas:any[] = [];

  subscription:Subscription;


  img:Observable<string>;

  constructor(
    private peliculaService:AddPeliculasService,
    private storage:AngularFireStorage
    ) { }

  ngOnInit(): void {

     this.subscription =  this.peliculaService.obtenerPeliculas().subscribe( (pelis:any)=> {

      this.peliculas = pelis;
      

    });

  //  const ref = this.storage.ref('imagenes/gs://movie-app-8fe0f.appspot.com');

  //  this.img = ref.getDownloadURL();

    
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

}
