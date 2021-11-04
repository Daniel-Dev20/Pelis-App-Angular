import { createReducer, on } from "@ngrx/store";
import { Usuario } from "../models/usuario.model";
import { setUser } from "./auth.actions";



export interface State{

    user:Usuario;
}


export const initialState:State = {

    user: null,
}


export const _authReducer = createReducer(

    initialState,
    on(setUser, (state, {user}) => ({...state, user:{...user}}))

)

export function authReducer(state:any, action:any){

    return _authReducer(state, action);
}