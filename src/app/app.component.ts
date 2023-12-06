import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { getErrorMessage, getLoading } from './store/shared/shared.selectors';
import { autoLogin } from './auth/state/auth.actions';
import { Loader } from './models/Loader.model';
import { getLoader } from './shared/loader/state/loader.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.showloading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);

    this.loader = this.store.select(getLoader);
    this.store.dispatch(autoLogin());
  
    this.loader.subscribe(data => console.log(data));


  
  }



  constructor(private store: Store<AppState>) {}

  title = 'ngrx-counter-app';
  showloading: Observable<boolean>;
  errorMessage: Observable<string>;

  loader:Observable<Loader>
}
