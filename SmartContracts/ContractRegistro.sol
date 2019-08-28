pragma solidity >=0.5 <0.6.0;

import './ContractMisure.sol';
import './ContractParametri.sol';
import { ABDKMath64x64 as Math64 } from './ABDKMath64x64.sol';

contract ContractRegistro {
    //event breakpoint(int128 value);
    struct Contabilita {
    uint no;
    string tariffa;
    uint data;
    string categoriaContabile;
    string descrizione;
    int128 percentuale;
    int128 prezzoValore;
    int128 prezzoPercentuale;
    int128 debitoValore;
    int128 debitoPercentuale;
    bool pagata;
    }
    
    ContractMisure cm;
    ContractParametri cp;
    
    mapping (uint => Contabilita) contabilita;
    uint public numeroContabilita = 0;
    
    int128 percentualeCompletamento;
    
    modifier onlyRup { require(cp.getIndirizzoRup() == msg.sender); _;}
    
    constructor() public { }
    
    function setIndirizzoCm (address indirizzo) public {
        cm = ContractMisure(indirizzo);
    }
    
    function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    
    function getContabilita(uint index) public view returns (uint, string memory, uint, string memory, string memory, int128, int128, int128, int128, int128, bool) {
        Contabilita memory cont = contabilita[index];
        return (cont.no, cont.tariffa, cont.data, cont.categoriaContabile, cont.descrizione, 
                cont.percentuale, cont.prezzoValore, cont.prezzoPercentuale, cont.debitoValore, 
                cont.debitoPercentuale, cont.pagata);
    }
    
    function approvaMisure() public onlyRup {
       for (uint i = 0; i < cm.numeroMisure(); i++) {
                (, , , string memory categoriaContabile, string memory descrizione, 
                 int128 percentuale,, bool valida, , bool approvata) = cm.getMisura(i);
            if (!approvata && valida) {
                int posizioneCategoria = findPosizioneCategoriaByDescrizione(categoriaContabile, descrizione);
                (, int128 valore,) = cp.getCategoriaContabileByNome(categoriaContabile);
                int128 valoreTotale = cp.valoreTotale();
                //int128 prezzoPercentuale = (valore*100)/valoreTotale;
                int128 prezzoPercentuale = Math64.div(Math64.mul(valore,1.8446744073709552e21),valoreTotale);
                if( posizioneCategoria >= 0){
                    uint posizione = uint(posizioneCategoria);
                    contabilita[posizione].percentuale += percentuale;
                    contabilita[posizione].data = now;
                    //emit breakpoint(valore);
                    //emit breakpoint(contabilita[posizione].percentuale);
                    //contabilita[posizione].debitoValore = (valore*percentuale)/100;
                    contabilita[posizione].debitoValore = Math64.div(Math64.mul(valore,contabilita[posizione].percentuale),1.8446744073709552e21);
                    //contabilita[posizione].debitoPercentuale = (prezzoPercentuale*percentuale)/100;
                    contabilita[posizione].debitoPercentuale = Math64.div(Math64.mul(prezzoPercentuale,contabilita[posizione].percentuale),1.8446744073709552e21);
                    contabilita[posizione].pagata = false;
                } else {
                    creaNuovaVoceRegistro(categoriaContabile, percentuale, descrizione);
                }
                cm.approvaMisura(i);
                percentualeCompletamento = calcoloProgresso();
                
            }
        }
   }
  
    function findPosizioneCategoriaByDescrizione(string memory categoriaContabile, string memory descrizione) public view returns (int) {
        bool categoriaTrovata = false;
        int posizioneCategoria = -1;
        for (uint i = 0; i< numeroContabilita && !categoriaTrovata; i++) {
            if (compareStrings(contabilita[i].categoriaContabile, categoriaContabile)
                && compareStrings(contabilita[i].descrizione, descrizione)) {
                  categoriaTrovata = true;
                  posizioneCategoria = int(i);
                } 
            }
        return posizioneCategoria;
        }
   
   function findPosizioneCategoria(string memory categoriaContabile) private view returns (int) {
        bool categoriaTrovata = false;
        int posizioneCategoria = -1;
        for (uint i = 0; i< numeroContabilita && !categoriaTrovata; i++) {
            if (compareStrings(contabilita[i].categoriaContabile, categoriaContabile)) {
                  categoriaTrovata = true;
                  posizioneCategoria = int(i);
                } 
            }
        return posizioneCategoria;
        }
    
    function compareStrings (string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
       }
       
    function creaNuovaVoceRegistro (string memory categoriaContabile, int128 percentuale, string memory descrizione) public  {
        (, int128 valore, string memory tariffa) = cp.getCategoriaContabileByNome(categoriaContabile);
        int128 valoreTotale = cp.valoreTotale();
        //int128 prezzoPercentuale = (valore*100)/valoreTotale;
        int128 prezzoPercentuale = Math64.div(Math64.mul(valore,1.8446744073709552e21),valoreTotale);
        contabilita[numeroContabilita] = Contabilita({
            no: numeroContabilita,
            tariffa: tariffa,
            data: now,
            categoriaContabile: categoriaContabile,
            descrizione: descrizione,
            percentuale: percentuale,
            prezzoValore: valore,
            prezzoPercentuale: prezzoPercentuale,
            debitoValore: Math64.div(Math64.mul(valore,percentuale),1.8446744073709552e21),
            debitoPercentuale: Math64.div(Math64.mul(prezzoPercentuale,percentuale),1.8446744073709552e21),
            pagata: false
        });
        numeroContabilita ++;
        }
        
    function calcoloProgresso() public view returns (int128) {
        int128 valoreParziale = calcoloValoreParziale();
        //return (valoreParziale*100)/cp.getValoreTotale();
        return Math64.div(Math64.mul(valoreParziale,1.8446744073709552e21), cp.valoreTotale());
    }
    
    function calcoloValoreParziale() public view returns(int128) {
        int128 valoreParziale = 0;
        for (uint i = 0; i<numeroContabilita; i++) {
            int128 percentuale = contabilita[i].percentuale;
            int128 valoreCategoria = contabilita[i].prezzoValore;
            //valoreParziale += (percentuale * valoreCategoria)/100;
            valoreParziale = Math64.add(valoreParziale,Math64.div(Math64.mul(percentuale,valoreCategoria),1.8446744073709552e21));
        }
        return valoreParziale;
        
    }
    
    function stornoPercentuale(string memory categoriaContabile, int128 percentuale, string memory descrizione) public {
        int posizioneCategoria = findPosizioneCategoriaByDescrizione(categoriaContabile, descrizione);
        if(posizioneCategoria >= 0){
                    //contabilita[uint(posizioneCategoria)].percentuale -= percentuale;
                    contabilita[uint(posizioneCategoria)].percentuale = 
                    Math64.sub(contabilita[uint(posizioneCategoria)].percentuale,percentuale);
        }
    }
    
    function findMinSogliaNotSuperata() public view returns (int128, bool, uint) {
         uint idSoglia = 0;
         int128 finalValue = 0;
         bool finalSuperata = false;
         bool trovata = false;
         for (uint j = 0; j<cp.numeroSoglie() && !trovata; j++) {
            ( ,int128 nsValue, bool nsSuperata) = cp.getSoglia(j);
            if (!nsSuperata) {
                for (uint i = 0; i<cp.numeroSoglie() && !trovata; i++) {
                    ( ,int128 value, bool superata) = cp.getSoglia(i);
                    if (value < nsValue && !superata) {
                        finalValue = value;
                        finalSuperata = superata;
                        trovata = true;
                        idSoglia = i;
                   }
                
                }
                
            }
        }
        return (finalValue, finalSuperata, idSoglia);
    }
    
    function pagataContabilita  (uint index) public {
        contabilita[index].pagata = true;
    }
    
}