pragma solidity >=0.5 <0.6.0;

import './ContractMisure.sol';
import './ContractParametri.sol';
import { ABDKMath64x64 as Math64 } from './ABDKMath64x64.sol';


contract ContractRegistro {
    event breakpoint(int128 value);
    
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
    
    mapping (uint => Contabilita) public arrayContabilita;
    uint public numeroContabilita;
    ContractMisure cm;
    ContractParametri cp;
    int128 percentualeCompletamento;
    

    
    modifier onlyRup {
        require(cp.getIndirizzoRup() == msg.sender); _;
    }
    
    constructor() public  {
        numeroContabilita = 0;
    }
    
    function setIndirizzoCm (address indirizzo) public {
        cm = ContractMisure(indirizzo);
    }
    
    function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    
    
    
    function approvaMisure() public onlyRup {

       for (uint i = 0; i < cm.numeroMisure(); i++) {
                (, string memory tariffa, uint data, string memory categoriaContabile, string memory descrizione, 
                 int128 percentuale,, bool valida, , bool approvata) = cm.getMisura(i);
            if (!approvata && valida) {
                int posizioneCategoria = findPosizioneCategoriaByDescrizione(categoriaContabile, descrizione);
                (, int128 valore,) = cp.getCategoriaContabileByNome(categoriaContabile);
                int128 valoreTotale = cp.getValoreTotale();
                //int128 prezzoPercentuale = (valore*100)/valoreTotale;
                int128 prezzoPercentuale = Math64.div(Math64.mul(valore,1.8446744073709552e21),valoreTotale);
                if( posizioneCategoria >= 0){
                    uint posizione = uint(posizioneCategoria);
                    arrayContabilita[posizione].percentuale += percentuale;
                    arrayContabilita[posizione].data = now;
                    //emit breakpoint(valore);
                    //emit breakpoint(arrayContabilita[posizione].percentuale);
                    //arrayContabilita[posizione].debitoValore = (valore*percentuale)/100;
                    arrayContabilita[posizione].debitoValore = Math64.div(Math64.mul(valore,arrayContabilita[posizione].percentuale),1.8446744073709552e21);
                    //arrayContabilita[posizione].debitoPercentuale = (prezzoPercentuale*percentuale)/100;
                    arrayContabilita[posizione].debitoPercentuale = Math64.div(Math64.mul(prezzoPercentuale,arrayContabilita[posizione].percentuale),1.8446744073709552e21);
                    arrayContabilita[posizione].pagata = false;
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
            if (compareStrings(arrayContabilita[i].categoriaContabile, categoriaContabile)
                && compareStrings(arrayContabilita[i].descrizione, descrizione)) {
                  categoriaTrovata = true;
                  posizioneCategoria = int(i);
                } 
            }
        return posizioneCategoria;
        }
   
   
   
   function findPosizioneCategoria(string memory categoriaContabile) private returns (int) {
        bool categoriaTrovata = false;
        int posizioneCategoria = -1;
        for (uint i = 0; i< numeroContabilita && !categoriaTrovata; i++) {
            if (compareStrings(arrayContabilita[i].categoriaContabile, categoriaContabile)) {
                  categoriaTrovata = true;
                  posizioneCategoria = int(i);
                } 
            }
        return posizioneCategoria;
        }
    
    function compareStrings (string memory a, string memory b)  private  pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
       }
       
    function creaNuovaVoceRegistro (string memory categoriaContabile, int128 percentuale, string memory descrizione) public  {
        (, int128 valore, string memory tariffa) = cp.getCategoriaContabileByNome(categoriaContabile);
        int128 valoreTotale = cp.getValoreTotale();
        //int128 prezzoPercentuale = (valore*100)/valoreTotale;
        int128 prezzoPercentuale = Math64.div(Math64.mul(valore,1.8446744073709552e21),valoreTotale);
        arrayContabilita[numeroContabilita].no = numeroContabilita;
        arrayContabilita[numeroContabilita].tariffa = tariffa;
        arrayContabilita[numeroContabilita].data = now;
        arrayContabilita[numeroContabilita].categoriaContabile = categoriaContabile;
        arrayContabilita[numeroContabilita].descrizione = descrizione;
        arrayContabilita[numeroContabilita].percentuale = percentuale ;
        arrayContabilita[numeroContabilita].prezzoValore = valore;
        arrayContabilita[numeroContabilita].prezzoPercentuale = prezzoPercentuale;
        //arrayContabilita[numeroContabilita].debitoValore = (valore*percentuale)/100;

        arrayContabilita[numeroContabilita].debitoValore = Math64.div(Math64.mul(valore,percentuale),1.8446744073709552e21);
        //arrayContabilita[numeroContabilita].debitoPercentuale = (prezzoPercentuale*percentuale)/100;
        arrayContabilita[numeroContabilita].debitoPercentuale = Math64.div(Math64.mul(prezzoPercentuale,percentuale),1.8446744073709552e21);
        arrayContabilita[numeroContabilita].pagata = false;
        numeroContabilita ++;
        }
        
    function getContabilita(uint index) public view returns (uint, string memory, uint, string memory, string memory, int128, int128, int128, int128, int128, bool) {
        Contabilita memory cont = arrayContabilita[index];
        return (cont.no, cont.tariffa, cont.data, cont.categoriaContabile, cont.descrizione, 
                cont.percentuale, cont.prezzoValore, cont.prezzoPercentuale, cont.debitoValore, 
                cont.debitoPercentuale, cont.pagata);
    }
    
    
    function stornoPercentuale(string memory categoriaContabile, int128 percentuale) public {
        int posizioneCategoria = findPosizioneCategoria(categoriaContabile);
        if(posizioneCategoria >= 0){
                    //arrayContabilita[uint(posizioneCategoria)].percentuale -= percentuale;
                    arrayContabilita[uint(posizioneCategoria)].percentuale = 
                    Math64.sub(arrayContabilita[uint(posizioneCategoria)].percentuale,percentuale);
        }
    }
        
    function calcoloProgresso() public view returns (int128) {
        int128 valoreParziale = calcoloValoreParziale();
        //return (valoreParziale*100)/cp.getValoreTotale();
        return Math64.div(Math64.mul(valoreParziale,1.8446744073709552e21), cp.getValoreTotale());
    }
    
    function calcoloValoreParziale() public view returns(int128) {
        int128 valoreParziale = 0;
        for (uint i = 0; i<numeroContabilita; i++) {
            int128 percentuale = arrayContabilita[i].percentuale;
            int128 valoreCategoria = arrayContabilita[i].prezzoValore;
            //valoreParziale += (percentuale * valoreCategoria)/100;
            valoreParziale = Math64.add(valoreParziale,Math64.div(Math64.mul(percentuale,valoreCategoria),1.8446744073709552e21));
        }
        return valoreParziale;
        
    }
    
    function findMinSogliaNotSuperata() public view returns (int128, bool, uint) {
         uint idSoglia = 0;
         int128 finalValue = 0;
         bool finalSuperata = false;
         bool trovata = false;
         for (uint j = 0; j<cp.getSoglieLength() && !trovata; j++) {
            (int128 nsValue, bool nsSuperata) = cp.getSoglia(j);
            if (!nsSuperata) {
                for (uint i = 0; i<cp.getSoglieLength() && !trovata; i++) {
                    (int128 value, bool superata) = cp.getSoglia(i);
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
        arrayContabilita[index].pagata = true;
    }
}