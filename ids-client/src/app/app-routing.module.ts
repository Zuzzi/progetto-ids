import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AreaRiservataComponent} from './components/area-riservata/area-riservata.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {HomeComponent} from './components/home/home.component';
import {GiornaleComponent} from './components/giornale/giornale.component';
import {LibrettoComponent} from './components/libretto/libretto.component';
import {RegistroComponent} from './components/registro/registro.component';
import {SalComponent} from './components/sal/sal.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';


const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
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
      path: 'libretto/:contractId',
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
      path: 'user-profile',
      component: UserProfileComponent,
      outlet: 'reserved'
    },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
