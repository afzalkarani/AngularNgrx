import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../../auth/state/auth.selectors';
import { logOut } from '../../../auth/state/auth.actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isAuthenticated: Observable<boolean>; 
  
  constructor(private store:Store<AppState>) {
        
  }
  ngOnInit(): void {   
    this.isAuthenticated= this.store.select(isAuthenticated)    
  }

  onLogout(event: Event)
  {
    event.preventDefault();
    this.store.dispatch(logOut())

  }



}
