import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { LoaderComponent } from './loader/loader.component';
import { LoaderReducer } from "./loader/state/loader.reducer";
import { LOADER_STATE_NAME } from "./loader/state/loader.selectors";


@NgModule({ 
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(LOADER_STATE_NAME, LoaderReducer),
  ], declarations: [LoaderComponent]})
export class SharedModule {

}