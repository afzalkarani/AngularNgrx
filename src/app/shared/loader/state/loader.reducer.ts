import { createReducer, on } from "@ngrx/store";
import { initialState } from "./loader.state";
import { loaderInit } from "./loader.actions";




const _loaderReducer = createReducer(
    initialState,  
    on(loaderInit, (state, action) =>{ 
      return {
        ...state,
        component: action.component
      }
    })
  );



export function LoaderReducer(state, action) {
    return _loaderReducer(state, action);
  }
  