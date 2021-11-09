

import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

import * as peliculas from './pages/peliculas.reducer';

import * as series from './pages/series.reducer';

export interface AppState{

    ui:ui.State;
    user:auth.State,
    peliculas: peliculas.State,
    series: series.State
}


export const appReducers:ActionReducerMap<AppState> = {

    ui:ui.uiReducer,
    user:auth.authReducer,
    peliculas:peliculas.peliculasReducer,
    series:series.seriesReducer

}