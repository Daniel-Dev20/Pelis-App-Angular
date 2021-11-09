import { createReducer, on } from "@ngrx/store";
import { Series } from "../models/series.model";
import { setSeries, unsetSeries } from "./series.actions";


export interface State{

    series: Series[];
}



export const initialState:State = {

    series: []
}


export const _seriesReducer = createReducer(
    initialState,
    on(setSeries, (state,  {series}) => ({...state, series: [...series]})),
    on(unsetSeries, (state) => ({...state, series: []}))
)


export function seriesReducer(state:any, action:any){

    return _seriesReducer(state, action)
}