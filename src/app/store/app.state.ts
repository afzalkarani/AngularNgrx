import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { AuthReducer } from "../auth/state/auth.reducers";
import { AUTH_STATE_NAME } from "../auth/state/auth.selectors";
import { AuthState } from "../auth/state/auth.state";
import { LoaderReducer } from "../shared/loader/state/loader.reducer";
import { LOADER_STATE_NAME } from "../shared/loader/state/loader.selectors";
import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selectors";
import { SharedState } from "./shared/shared.state";

export interface AppState{
    [SHARED_STATE_NAME]:SharedState;
    [AUTH_STATE_NAME ]:AuthState;
    router:RouterReducerState
}

export const appReducer ={
    [SHARED_STATE_NAME]: SharedReducer,
    [AUTH_STATE_NAME]: AuthReducer,
    [LOADER_STATE_NAME] : LoaderReducer,
    router: routerReducer
}
  