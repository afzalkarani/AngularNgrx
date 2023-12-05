import { Injectable } from '@angular/core';
import { environoment } from '../environoments/environoment';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../models/authResponseData..model';
import { Observable, timeInterval } from 'rxjs';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { logOut } from '../auth/state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(
    private http: HttpClient,
    private store:Store<AppState>    
    ) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environoment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environoment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );

    return user;
  }

  runTimeoutInterval(user: User) {
    const todayDate = new Date().getTime();
    const expirationDate = user.ExpireDate.getTime();
    const timeInterval = expirationDate - todayDate;

    this.timeoutInterval = setTimeout(() => {
     this.store.dispatch(logOut())
    }, timeInterval);
  }

  getUserLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const _expirationDate = new Date(userData.expirationDate);
        const user = new User(
          userData.email,
          userData.token,
          userData.localId,
          _expirationDate
        );
        this.runTimeoutInterval(user);
        return user;
      }
    }
    return null;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred, please try again';
    }
  }

  setUserLocalStorage(user: User) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(user));
      this.runTimeoutInterval(user);
    }
  }

  ClearLoggedUserSessions() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userData');
      if (this.timeoutInterval) {
        clearTimeout(this.timeoutInterval);
        this.timeoutInterval = null;
      }
    }
  }
}
