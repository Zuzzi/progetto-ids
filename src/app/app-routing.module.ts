import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AreaRiservataComponent} from './area-riservata/area-riservata.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';
import {GiornaleComponent} from './giornale/giornale.component';
import {LibrettoComponent} from './libretto/libretto.component';
import {RegistroComponent} from './registro/registro.component';
import {SalComponent} from './sal/sal.component';
import {ControlloComponent} from './controllo/controllo.component';
import {GestioneComponent} from './gestione/gestione.component';

const routes: Routes = [
  {path: 'welcome', component: AreaRiservataComponent},
  {path: 'area-riservata', component: AreaRiservataComponent, children: [
    {
      path: 'home',
      component: HomeComponent,
      outlet: 'reserved'
    },
    {
      path: 'giornale',
      component: GiornaleComponent,
      outlet: 'reserved'
    },
    {
      path: 'libretto',
      component: LibrettoComponent,
      outlet: 'reserved'
    },
    {
      path: 'registro',
      component: RegistroComponent,
      outlet: 'reserved'
    },
    {
      path: 'sal',
      component: SalComponent,
      outlet: 'reserved'
    },
    {
      path: 'controllo',
      component: ControlloComponent,
      outlet: 'reserved'
    },
    {
      path: 'gestione',
      component: GestioneComponent,
      outlet: 'reserved'
    }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
