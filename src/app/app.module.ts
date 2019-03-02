import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessoComponent } from './accesso/accesso.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { NavbarComponent } from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { DialogBodyLoginComponent } from './dialog-body-login/dialog-body-login.component';
@NgModule({
  declarations: [
    AppComponent,
    AccessoComponent,
    AreaRiservataComponent,
    NavbarComponent,
    DialogBodyLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyLoginComponent]
})
export class AppModule { }
