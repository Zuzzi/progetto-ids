# ProgettoIds

#1. installare:

npm install -g node-gyp
npm install --globally --production windows-build-tools
npm install solc
npm install web3
npm install -g npm-install-version

cd %UserProfile%
niv solc@0.4.25 

#rimuovere:

npm uninstall -g windows-build-tools --save

# opzionalmente da programmi e funzionalità disinstallare
#windows build tools... e tutto ciò che riguarda visual studio (tranne visual studio code)

#2. modifica per far funzionare web3 dal front-end

#modificare il file:
node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js
#indivduando la riga con:
node:false 
#cambiandola in:
node: { crypto: true, stream: true, fs: 'empty', net: 'empty' }

#3. script per avvio blockchain alternativo a instabul.start 
vagrant up
vagrant ssh
cd quorum-examples/7nodes
sudo nano byzantium-start.sh
#copiare il contentuto del file byzantium-start.sh dalla repo
#per incollarlo nell'editor nano: right click del mouse
#per salvare il file: Ctrl+o quindi Invio
#rendere lo script eseguibile:
sudo chmod 777 byzantium-start.sh
#per avviare i nodi:
sudo ./byzantium-start.sh

## Express Server per MongoDb

nella cartella ids-server lanciare:
node webService

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
