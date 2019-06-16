import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//import 'hammerjs';

if (environment.production) {
  enableProdMode();
  window.console.log = function () { };   // disable any console.log debugging statements in production mode
  // window.console.error = function () { };
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
