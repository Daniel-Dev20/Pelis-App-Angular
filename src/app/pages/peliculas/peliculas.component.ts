import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subscription } from 'rxjs';
import { AddPeliculasService } from 'src/app/services/add-peliculas.service';


//FONTAWESOME
import { faSpinner, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setPelicula } from '../peliculas.actions';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [
  ]
})
export class PeliculasComponent implements OnInit, OnDestroy {

  public peliculas:any[] = [];

  public subscription:Subscription;


  public img:Observable<string>;


  public faspinner = faSpinner;

  public cargando:boolean = false;

  public faTrash = faTrash;

  public faEdit = faEdit;

 

  constructor(

    private peliculaService:AddPeliculasService,

    private storage:AngularFireStorage,

    private store:Store<AppState>

    ) { }

  ngOnInit(): void {

    this.cargando = true;

     this.subscription =  this.peliculaService.obtenerPeliculas().subscribe( (pelis:any)=> {


      console.log('peliculas', pelis);
      
      this.peliculas = pelis;

      this.cargando = false;
      
      this.store.dispatch(setPelicula({peliculas:pelis}))

    });

 
  
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

}
