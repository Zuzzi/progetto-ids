pragma solidity >=0.5 <0.6.0;

import './ContractMisure.sol';
import './ContractParametri.sol';


contract ContractRegistro {
    
    struct Contabilita {
    uint no;
    string tariffa;
    uint data;
    string categoriaContabile;
    string descrizione;
    uint percentuale;
    uint prezzoValore;
    uint prezzoPercentuale;
    uint debitoValore;
    uint debitoPercentuale;
    bool pagata;
    }
    
    mapping (uint => Contabilita) public arrayContabilita;
    uint public numeroContabilita;
    ContractMisure cm;
    ContractParametri cp;
    uint percentualeCompletamento;
    

    
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
                (uint no, string memory tariffa, uint data, string memory categoriaContabile, string memory descrizione, 
                 uint percentuale, string memory riserva, bool valida, bool invalidabile, bool approvata) = cm.getMisura(i);
            if (!approvata && valida) {
                int posizioneCategoria = findPosizioneCategoriaByDescrizione(categoriaContabile, descrizione);
                if( posizioneCategoria >= 0){
                    arrayContabilita[uint(posizioneCategoria)].percentuale += percentuale;
                    arrayContabilita[uint(posizioneCategoria)].data = now;
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
       
    function creaNuovaVoceRegistro (string memory categoriaContabile, uint percentuale, string memory descrizione) public  {
        (string memory nomeCategoria, uint valore, string memory tariffa) = cp.getCategoriaContabileByNome(categoriaContabile);
        uint valoreTotale = cp.getValoreTotale();
        uint prezzoPercentuale = (valore*100)/valoreTotale;
       
        
        arrayContabilita[numeroContabilita].no = numeroContabilita;
        arrayContabilita[numeroContabilita].tariffa = tariffa;
        arrayContabilita[numeroContabilita].data = now;
        arrayContabilita[numeroContabilita].categoriaContabile = categoriaContabile;
        arrayContabilita[numeroContabilita].descrizione = descrizione;
        arrayContabilita[numeroContabilita].percentuale = percentuale ;
        arrayContabilita[numeroContabilita].prezzoValore = valore;
        arrayContabilita[numeroContabilita].prezzoPercentuale = prezzoPercentuale;
        arrayContabilita[numeroContabilita].debitoValore = (valore*percentuale)/100;
        arrayContabilita[numeroContabilita].debitoPercentuale = (prezzoPercentuale*percentuale)/100;
        arrayContabilita[numeroContabilita].pagata = false;
        numeroContabilita ++;
        }
        
    function getContabilita(uint index) public view returns (uint, string memory, uint, string memory, string memory, uint, uint, uint, uint, uint, bool) {
        Contabilita memory cont = arrayContabilita[index];
        return (cont.no, cont.tariffa, cont.data, cont.categoriaContabile, cont.descrizione, 
                cont.percentuale, cont.prezzoValore, cont.prezzoPercentuale, cont.debitoValore, 
                cont.debitoPercentuale, cont.pagata);
    }
    
    
    function stornoPercentuale(string memory categoriaContabile, uint percentuale) public {
        int posizioneCategoria = findPosizioneCategoria(categoriaContabile);
        if(posizioneCategoria >= 0){
                    arrayContabilita[uint(posizioneCategoria)].percentuale -= percentuale;
        }
    }
        
    function calcoloProgresso() public view returns (uint) {
        uint valoreParziale = calcoloValoreParziale();
        return (valoreParziale*100)/cp.getValoreTotale();
    }
    
    function calcoloValoreParziale() public view returns(uint) {
        uint valoreParziale = 0;
        for (uint i = 0; i<numeroContabilita; i++) {
            uint percentuale = arrayContabilita[i].percentuale;
            uint valoreCategoria = arrayContabilita[i].prezzoValore;
            valoreParziale += (percentuale * valoreCategoria)/100;
        }
        return valoreParziale;
        
    }
    
    function findMinSogliaNotSuperata() public view returns (uint, bool) {
        (uint minValue, bool minSuperata) = cp.getSoglia(0);
        bool trovata = false;
        for (uint i = 0; i<cp.getSoglieLength() && !trovata; i++) {
            (uint value, bool superata) = cp.getSoglia(i);
            if (value < minValue && !superata) {
                minValue = value;
                minSuperata = superata;
                trovata = true;
            }
        }
        
        return (minValue, minSuperata);
    }
    
    
    function pagataContabilita  (uint index) public {
        arrayContabilita[index].pagata = true;
    }
}