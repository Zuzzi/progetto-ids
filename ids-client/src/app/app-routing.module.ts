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
import {AuthGuard} from '@app/guards/auth-guard';
import { ContrattoGuard } from './guards/contratto.guard';

// TODO: gestire url non consentiti (considera anche parametri illegali o nulli)

const routes: Routes = [
  {path: 'login', component: WelcomeComponent},
  {path: '', redirectTo: 'area-riservata/contract/', pathMatch: 'full'},
  {path: 'area-riservata/contract/:contractId', component: AreaRiservataComponent, canActivate: [AuthGuard],
   children: [
    {
      path: '',
     redirectTo: 'home',
     pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'giornale',
      component: GiornaleComponent,
    },
    {
      path: 'libretto',
      component: LibrettoComponent,
    },
    {
      path: 'registro',
      component: RegistroComponent,
    },
    {
      path: 'sal',
      component: SalComponent,
    },
  ]},
  // {path: 'area-riservata', component: AreaRiservataComponent, children: [
  //   {
  //     path: 'user-profile',
  //     component: UserProfileComponent,
  //   },
  // ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
