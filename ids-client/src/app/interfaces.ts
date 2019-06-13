import { Unit } from 'web3-utils';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Misura {
  no: number;
  tariffa: string;
  data: number;
  categoriaContabile: string;
  descrizione: string;
  percentuale: number;
  riserva: string;
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
  contracts: ContractSchema[];
}

export interface ContractSchema {
  _id: string;
  nome: string;
  libretto: {
    [address: string]: string
  };
  giornale: {
    [address: string]: string
  };
  registro: {
    [address: string]: string
  };
  parametri: {
    [address: string]: string
  };
  sal: {
    [address: string]: string
  };
}
