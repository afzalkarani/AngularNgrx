import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoaderState } from "./loader.state";

export const LOADER_STATE_NAME = "loader"


const getLoaderState = createFeatureSelector<LoaderState>(LOADER_STATE_NAME);


export const getLoader = createSelector(getLoaderState, (state)=>{
    return state.component
})