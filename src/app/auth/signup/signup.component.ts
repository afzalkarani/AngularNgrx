import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { signupStart } from '../state/auth.actions';
import { setLoadingSpinner } from '../../store/shared/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
    private store:Store<AppState>
    ) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  SignUpUser()
  {
    if(!this.signUpForm.valid)
    {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(signupStart({email, password}));


  }
}
