import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  autoLogin,
  logOut,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { catchError, delay, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/shared/shared.actions';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            setErrorMessage({ errorMessage: '' });
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserLocalStorage(user);
            return loginSuccess({ user, redirect:true });
          }),
          catchError((err) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errMessage = this.authService.getErrorMessage(
              err.error.error.message
            );
            return of(setErrorMessage({ errorMessage: errMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ errorMessage: '' }));          
          if(action.redirect)
          {
          this.router.navigate(['']);
          }
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserLocalStorage(user);
            return signupSuccess({ user, redirect:true });
          }),
          catchError((err) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errMessage = this.authService.getErrorMessage(
              err.error.error.message
            );
            return of(setErrorMessage({ errorMessage: errMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserLocalStorage();
        return of(loginSuccess({ user, redirect:false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logOut),
        map((action) => {
          this.authService.ClearLoggedUserSessions();
          this.router.navigate(['auth']);
        })
      );
    },
    {
      dispatch: false,
    }
  );
}
