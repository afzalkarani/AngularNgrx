import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';

export const AUTH_LOGIN_ACTION='[auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout'


export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User, redirect:boolean }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: User, redirect:boolean }>()
);


export const autoLogin = createAction(AUTH_LOGIN_ACTION);

export const logOut = createAction(LOGOUT_ACTION)