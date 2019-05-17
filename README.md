# Progetto IDS

## Installazione componenti
```
npm install -g node-gyp
npm install --globally --production windows-build-tools
npm install solc@0.5.1
npm install web3
```
### Dopo aver installato _web3_,  opzionalmente rimuovere _windows-build-tools_:
```
npm uninstall -g windows-build-tools --save
``` 
da programmi e funzionalità disinstallare_windows build tools..._ e tutto ciò che riguarda visual studio (tranne visual studio code)

## Modifica per far funzionare web3 dal front-end
modificare il file:
>node_modules/@angular-devkit/build-angular/src/angular-cli-files/
models/webpack-configs/browser.js  

indivduando la riga con:
>node:false  

cambiandola in:  
>node: { crypto: true, stream: true, fs: 'empty', net: 'empty' }

## Script WebSocket Blockchain

Procedura per inserire lo script che consente la comunicazione __websocket__ con la blockchain d'esempio 7nodes (l'algoritmo di consenso è sempre `Istanbul`)
```
vagrant up  
vagrant ssh  
cd quorum-examples/7nodes  
sudo nano byzantium-start.sh
```
copiare il contentuto del file [byzantium-start.sh](byzantium-start.sh) dalla repo 
per incollarlo nell'editor nano: 
>Click destro del mouse (su poweshell/cmd) o Ctrl+V (su bash) 

per salvare il file: 
>`Ctrl+O` quindi `Invio`

rendere lo script eseguibile:
```
sudo chmod 777 byzantium-start.sh
```
per avviare i nodi:
```
sudo ./byzantium-start.sh
```
## Scritp RemixIDE Blockchain 

Procedura per inserire lo script che consente a remixIDE di interfaccarsi con la blockchain d'esempio 7nodes
```
vagrant up  
vagrant ssh  
cd quorum-examples/7nodes  
sudo nano istanbul-x-start.sh
```
copiare il contentuto del file [istanbul-x-start.sh](istanbul-x-start.sh) dalla repo 
per incollarlo nell'editor nano: 
>Click destro del mouse (su poweshell/cmd) o Ctrl+V (su bash) 

per salvare il file: 
>`Ctrl+O` quindi `Invio`

rendere lo script eseguibile:
```
sudo chmod 777 istanbul-x-start.sh
```
per avviare i nodi:
```
sudo ./istanbul-x-start.sh
```

## Modifica Genesis file per supportare solc0.5.5+

```
vagrant up  
vagrant ssh  
cd quorum-examples/7nodes  
```
fare un backup di `istanbul-genesis.json`
```
sudo mv istanbul-genesis.json istanbul-genesis.old
```
creare un nuovo file genesis
```
sudo nano istanbul-genesis.json
```
copiare il contentuto del file [istanbul-genesis.json](istanbul-genesis.json) dalla repo 
per incollarlo nell'editor nano: 
>Click destro del mouse (su poweshell/cmd) o Ctrl+V (su bash) 

per salvare il file: 
>`Ctrl+O` quindi `Invio`

**Nota: è necessario inizializzare la blockchain per utilizzare la configurazione del file genesis
modificato**

## Avvio / Arrsto Blockchain Quorum 7nodes

**Avvio:**
```
vagrant up
vagrant ssh
cd quorum-examples/7nodes 
sudo ./<byzantium/istanbul/raft...>-start.sh
```
**Inizializzazione Blockchain:**
``` 
sudo ./</istanbul/raft...>-init.sh
```
**Arresto:**
``` 
sudo ./stop.sh
exit
vagrant halt
```

## Express Server per MongoDb
Nella cartella ids-server lanciare:
```
node webService
```

## Angular Development server
_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0._  
Nella cartella ids-client lanciare:
```
npm start
```
~~Run `npm start` for a dev server.~~ 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Mongo Dump/Restore

### Dump
Nella cartella di installazione di mongo (generalmente `C://%programfiles%/MongoDB/Server/4.0/bin`) lanciare:
```
./mongodump.exe -d {nome-database} -o {path-to-backup-folder}
```

### Restore
Nella cartella di installazione di mongo (generalmente `C://%programfiles%/MongoDB/Server/4.0/bin`) lanciare:
```
./mongorestore.exe --db {nome-database} {path-to-backup-folder}
```

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
