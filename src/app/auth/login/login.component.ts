import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from '../../store/shared/shared.actions';
import { loaderInit } from '../../shared/loader/state/loader.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
    
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  loginForm: FormGroup;


  onLogin()
  {
    const email = this.loginForm.value.email;
    const password= this.loginForm.value.password;

    //this.store.dispatch(setLoadingSpinner({status:true}))


    this.store.dispatch(loaderInit({component:{
      message:`Logging In`,
      spinDialog:true}}))


      


    this.store.dispatch(loginStart({email, password}))
    
  }
}
