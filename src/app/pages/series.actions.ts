import { createAction, props } from "@ngrx/store";
import { Series } from "../models/series.model";


export const  setSeries = createAction(

    '[series] setSeries',
    props<{series:Series[]}>()
    
);


export const unsetSeries = createAction('[series] unsetSeries');