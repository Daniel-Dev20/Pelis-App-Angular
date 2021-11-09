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


  subscription:Subscription;

  constructor(
    private peliculaService:AddPeliculasService,
    private store:Store<AppState>
    ) { }

  ngOnInit(): void {

     this.subscription =  this.peliculaService.obtenerPeliculas().subscribe( (pelis:any)=> {

      this.store.dispatch(setPelicula({peliculas: pelis}))

      console.log(pelis);
      

    });
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

}
