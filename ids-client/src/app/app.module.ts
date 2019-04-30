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
import { DialogBodyInfocontrattoComponent } from './dialog-body-infocontratto/dialog-body-infocontratto.component';
import { DialogBodyInsgiornaleComponent } from './dialog-body-insgiornale/dialog-body-insgiornale.component';
import { DialogBodyVisallegatiComponent } from './dialog-body-visallegati/dialog-body-visallegati.component';
import { DialogBodyInsregistroComponent } from './dialog-body-insregistro/dialog-body-insregistro.component';
import { DialogBodyInslibrettoComponent } from './dialog-body-inslibretto/dialog-body-inslibretto.component';
import { DialogBodyVisriservaComponent } from './dialog-body-visriserva/dialog-body-visriserva.component';
import { DialogBodyApprovazioneComponent } from './dialog-body-approvazione/dialog-body-approvazione.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogBodyApprovazionemisureComponent } from './dialog-body-approvazionemisure/dialog-body-approvazionemisure.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
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
                    DialogBodyVisriservaComponent, DialogBodyApprovazioneComponent, DialogBodyApprovazionemisureComponent]
})
export class AppModule { }