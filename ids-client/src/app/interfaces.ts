import { Unit } from 'web3-utils';

export interface Misura {
  no: string;
  tariffa: string;
  data: Date;
  categoriaContabile: string;
  descrizione: string;
  percentuale: Unit;
}
