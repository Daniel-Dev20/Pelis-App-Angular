import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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

<<<<<<< HEAD

  subscription:Subscription;

  constructor(
    private peliculaService:AddPeliculasService,
    private store:Store<AppState>
    ) { }
=======
  peliculas:any[] = [];

  constructor(private peliculaService:AddPeliculasService) { }
>>>>>>> 21d779729dfde328ee4138e4cfc1d66e0d40c376

  ngOnInit(): void {

     this.subscription =  this.peliculaService.obtenerPeliculas().subscribe( (pelis:any)=> {

<<<<<<< HEAD
      this.store.dispatch(setPelicula({peliculas: pelis}))

      console.log(pelis);
=======
      this.peliculas = resp;
>>>>>>> 21d779729dfde328ee4138e4cfc1d66e0d40c376
      

    });
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

}
