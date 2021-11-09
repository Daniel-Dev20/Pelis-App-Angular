import { createAction, props } from "@ngrx/store";
import { Peliculas } from "../models/peliculas";




export const setPelicula = createAction(

    '[peliculas] setPeliculas',
    props<{peliculas:Peliculas[]}>()
    
);


export const unsetPeliculas = createAction('[peliculas] unsetPeliculas');