import { createReducer, on } from "@ngrx/store";
import { Peliculas } from "../models/peliculas";
import { setPelicula, unsetPeliculas } from "./peliculas.actions";



export interface State{

    peliculas: Peliculas[];
}



export const initialState:State = {

    peliculas: []
}



export const _peliculasReducer = createReducer(

    initialState,

    on(setPelicula, (state,  {peliculas}) => ({...state, peliculas: [...peliculas]})),

    on(unsetPeliculas, (state) => ({...state, peliculas:[]}))
)


export function peliculasReducer(state:any, action:any){

    return _peliculasReducer(state, action)
}