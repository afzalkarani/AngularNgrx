import { createAction, props } from "@ngrx/store";
import { Loader } from "../../../models/Loader.model";


export const LOADER_INIT_ACTION = '[loader page] init action';

export const loaderInit = createAction(
    LOADER_INIT_ACTION,
    props<{ component: Loader}>()
  );