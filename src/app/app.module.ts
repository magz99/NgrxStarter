import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { UserViewModule} from "./features/user-view/user-view.module";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    UserViewModule,
    StoreDevtoolsModule.instrument() // TODO: remove this later
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
