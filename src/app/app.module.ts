import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthEffects } from './auth/state/auth.effects';
import { AuthTokenInterceptor } from './services/AuthToken.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),    
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    StoreRouterConnectingModule.forRoot({serializer:CustomSerializer})
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS, useClass:AuthTokenInterceptor, multi:true
    }   
  ],

  
  bootstrap: [AppComponent]
})
export class AppModule { }
