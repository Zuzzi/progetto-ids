import { Unit } from 'web3-utils';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { EncryptedKeystoreV3Json } from 'web3-eth-accounts';
import { Contract } from 'web3-eth-contract';
import { Observable } from 'rxjs';

export enum SmartContractType {
  Libretto = 'libretto',
  Registro = 'registro',
  Sal = 'sal',
  Giornale = 'giornale',
  Parametri = 'parametri',
}

export enum UserTitle {
  Direttore = 'direttore',
  Ditta = 'ditta',
  Rup = 'rup',
}

export class SmartContract<T extends SmartContractType> {
  type: T;
  instance: Contract;
  constructor(type: T, instance: Contract) {
    this.type = type;
    this.instance = instance;
  }
}

export interface Misura {
  no: number;
  tariffa: string;
  data: Date;
  categoriaContabile: string;
  descrizione: string;
  percentuale: number;
  riserva: string;
  valida: boolean;
  invalidabile: boolean;
  approvata: boolean;
}

//TODO: cambiare nome a questa interfaccia
export interface DialogInserimentoMisura {
  categoriaContabile: string;
  descrizione: string;
  percentuale: number;
  riserva: string;
}

export interface DialogInfoContratto {
  descrizione: string;
  elencoCategorie: Observable<any>;
  elencoStrutture: Observable<any>;
  elencoSoglie: Observable<any>;
}

export interface VoceRegistro {
  no: number;
  tariffa: string;
  data: Date;
  categoriaContabile: string;
  descrizione: string;
  percentuale: number;
  prezzoValore: number;
  prezzoPercentuale: number;
  debitoValore: number;
  debitoPercentuale: number;
  pagata: boolean;
}

export interface Sal {
  no: number;
  tariffa: string;
  data: Date;
  categoriaContabile: string;
  descrizione: string;
  percentuale: number;
  prezzoValore: number;
  prezzoPercentuale: number;
  debitoValore: number;
  debitoPercentuale: number;
}

export interface CategoriaContabile {
  nome: string;
  valore: number;
  tariffa: string;
}

export interface Struttura {
  nome: string;
}
// Tipologia di attrezzatura
export interface Tipologia {
  nome: string;
}

export interface Qualifica {
  nome: string;
}

export class User {
  username: string;
  password: string;
  title: string;
  nome: string;
  cognome: string;
  data: Date;
  codiceFiscale: string;
  residenza: string;
  email: string;
  telefono: number;
  citta: string;
  provincia: string;
  CAP: number;
  keystore: EncryptedKeystoreV3Json;
  contracts: ContractSchema[];
}

export interface Soglia {
  no: number;
  valore: number;
  superata: boolean;
}

export interface Giornale {
  no: number;
  data: Date;
  descrizioneLocazione: string;
  allegati: string;
  operai: Operai[];
  attrezzature: Attrezzatura[];
}

export interface Operai {
  nome: string;
  cognome: string;
  qualifica: string;
  orePresenza: number;
}

export interface Attrezzatura {
  tipologia: string;
  quantita: string;
}




export interface ContractSchema {
  _id: string;
  nome: string;
  libretto: SmartContractSchema;
  giornale: SmartContractSchema;
  registro: SmartContractSchema;
  parametri: SmartContractSchema;
  sal: SmartContractSchema;
}

export interface SmartContractSchema {
  address: string;
}
