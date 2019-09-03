import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessoComponent } from './components/accesso/accesso.component';
import { AreaRiservataComponent } from './components/area-riservata/area-riservata.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { DialogBodyLoginComponent } from './components/dialog-body-login/dialog-body-login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { GiornaleComponent } from './components/giornale/giornale.component';
import { LibrettoComponent } from './components/libretto/libretto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SalComponent } from './components/sal/sal.component';
import { DialogBodyInfocontrattoComponent } from './components/dialog-body-infocontratto/dialog-body-infocontratto.component';
import { DialogBodyInsgiornaleComponent } from './components/dialog-body-insgiornale/dialog-body-insgiornale.component';
import { DialogBodyVisallegatiComponent } from './components/dialog-body-visallegati/dialog-body-visallegati.component';
import { DialogBodyInsregistroComponent } from './components/dialog-body-insregistro/dialog-body-insregistro.component';
import { DialogBodyInslibrettoComponent } from './components/dialog-body-inslibretto/dialog-body-inslibretto.component';
import { DialogBodyVisriservaComponent } from './components/dialog-body-visriserva/dialog-body-visriserva.component';
import { DialogBodyApprovazioneComponent } from './components/dialog-body-approvazione/dialog-body-approvazione.component';
import { DialogBodyInvalidamisuraComponent } from './components/dialog-body-invalidamisura/dialog-body-invalidamisura.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogBodyApprovazionemisureComponent } from './components/dialog-body-approvazionemisure/dialog-body-approvazionemisure.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ContrattoComponent } from './components/contratto/contratto.component';
import { LoadingComponent } from './components/loading/loading.component';
import { registerLocaleData } from '@angular/common';
import  localeIt  from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');
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
    DialogBodyInfocontrattoComponent,
    DialogBodyInsgiornaleComponent,
    DialogBodyVisallegatiComponent,
    DialogBodyInsregistroComponent,
    DialogBodyInslibrettoComponent,
    DialogBodyVisriservaComponent,
    DialogBodyApprovazioneComponent,
    DialogBodyApprovazionemisureComponent,
    UserProfileComponent,
    DialogBodyInvalidamisuraComponent,
    ContrattoComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // tslint:disable-next-line:max-line-length
  entryComponents: [DialogBodyLoginComponent, DialogBodyInfocontrattoComponent, DialogBodyInsgiornaleComponent,
                    DialogBodyVisallegatiComponent, DialogBodyInsregistroComponent, DialogBodyInslibrettoComponent,
                    DialogBodyVisriservaComponent, DialogBodyApprovazioneComponent, DialogBodyApprovazionemisureComponent,
                    DialogBodyInvalidamisuraComponent]
})
export class AppModule { }
