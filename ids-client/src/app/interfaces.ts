import { Unit } from 'web3-utils';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { EncryptedKeystoreV3Json } from 'web3-eth-accounts';
import { Contract } from 'web3-eth-contract';

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
  data: number;
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

export interface VoceRegistro {
  no: number;
  tariffa: string;
  data: number;
  categoriaContabile: string;
  descrizione: string;
  percentuale: number;
  prezzoValore: number;
  prezzoPercentuale: number;
  debitoValore: number;
  debitoPercentuale: number;
  pagata: boolean;
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
};
