import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessoComponent } from './accesso/accesso.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { DialogBodyLoginComponent } from './dialog-body-login/dialog-body-login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { GiornaleComponent } from './giornale/giornale.component';
import { LibrettoComponent } from './libretto/libretto.component';
import { RegistroComponent } from './registro/registro.component';
import { SalComponent } from './sal/sal.component';
import { ControlloComponent } from './controllo/controllo.component';
import { GestioneComponent } from './gestione/gestione.component';
import { DialogBodyInfocontrattoComponent } from './dialog-body-infocontratto/dialog-body-infocontratto.component';
@NgModule({
  declarations: [
    AppComponent,
    AccessoComponent,
    AreaRiservataComponent,
    DialogBodyLoginComponent,
    WelcomeComponent,
    HomeComponent,
    GiornaleComponent,
    LibrettoComponent,
    RegistroComponent,
    SalComponent,
    ControlloComponent,
    GestioneComponent,
    DialogBodyInfocontrattoComponent,
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
  entryComponents: [DialogBodyLoginComponent, DialogBodyInfocontrattoComponent]
})
export class AppModule { }
