import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { logOut, loginSuccess, signupSuccess } from './auth.actions';
import { catchError } from 'rxjs';

const _authReducer = createReducer(
  initialState,

  on(loginSuccess, (state, action) =>{ 
    return {
      ...state,
      user: action.user
    }
 
 
  }),
  on(signupSuccess, (state, action) =>{
    return {
      ...state,
      user: action.user
    }
  }),
  on(logOut, (state, action)=>{
    return {
      ...state,
      user:null
    }
  })

);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
