pragma solidity >=0.5 <0.6.0;
import './ContractMisure.sol';

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
    }
    
    
    
    Contabilita[] arrayContabilita;
    ContractMisure cm;
    address private rup;
    
    
    
    modifier onlyRup {
        require(rup == msg.sender); _;
    }
    
    constructor() public {
        rup = msg.sender;
    }
    
    function setIndirizzoCm (address indirizzo) public {
        cm = ContractMisure(indirizzo);
    }
    
    
    function approvaMisure() public onlyRup {

       for (uint i = 1; i <= cm.numeroMisure(); i++) {
                ( uint no, string memory tariffa, uint data, string memory categoriaContabile, string memory descrizione, 
                 uint percentuale, string memory riserva, bool valida, bool invalidabile, bool approvata) = cm.getMisura(i);
            if (!approvata && valida) {
                int posizioneCategoria = findPosizioneCategoria(categoriaContabile);
                if( posizioneCategoria >= 0){
                    arrayContabilita[uint(posizioneCategoria)].percentuale += percentuale;
                } else {
                    Contabilita memory nuovaVoce;
                    creaNuovaVoce(nuovaVoce, categoriaContabile, percentuale);
                    arrayContabilita.push(nuovaVoce);
                }
                //cm.arrayMisure[i].approvata = true;
                cm.approvaMisura(i);
                
            }
        }
   }
   
   function findPosizioneCategoria(string memory categoriaContabile) private view returns (int) {
        bool categoriaTrovata = false;
        int posizioneCategoria = -1;
        for (uint i = 0; i< arrayContabilita.length && !categoriaTrovata; i++) {
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
       
    function creaNuovaVoce (Contabilita memory nuovaVoce, string memory categoriaContabile, uint percentuale) private pure {
            nuovaVoce.no = 0;
            nuovaVoce.tariffa = "tariffa";
            nuovaVoce.data = 123;
            nuovaVoce.categoriaContabile = categoriaContabile;
            nuovaVoce.descrizione = "descrizione";
            nuovaVoce.percentuale = percentuale ;
            nuovaVoce.prezzoValore = 123;
            nuovaVoce.prezzoPercentuale = 123;
            nuovaVoce.debitoValore = 123;
            nuovaVoce.debitoPercentuale = 123;
        }
        
    function getContabilita(uint index) public view returns (uint, string memory, uint, string memory, string memory, uint, uint, uint, uint, uint) {
        Contabilita memory cont = arrayContabilita[index];
        return (cont.no, cont.tariffa, cont.data, cont.categoriaContabile, cont.descrizione, cont.percentuale, cont.prezzoValore, cont.prezzoPercentuale, cont.debitoValore, cont.debitoPercentuale);
    }
    
    function getContabilitaByNo(uint index) public view returns (uint, string memory, uint, string memory, string memory, uint, uint, uint, uint, uint) {
        bool contabilitaTrovata = false;
        uint posizione = 0;
        for (uint i = 0; i< arrayContabilita.length && !contabilitaTrovata; i++) {
            if (arrayContabilita[i].no == index) {
                contabilitaTrovata = true;
                posizione = i;
            }
        }
        return (arrayContabilita[posizione].no, arrayContabilita[posizione].tariffa, arrayContabilita[posizione].data, 
                arrayContabilita[posizione].categoriaContabile, arrayContabilita[posizione].descrizione, arrayContabilita[posizione].percentuale, arrayContabilita[posizione].prezzoValore,
                arrayContabilita[posizione].prezzoPercentuale, arrayContabilita[posizione].debitoValore, arrayContabilita[posizione].debitoPercentuale);
    }
    
    
        function stornoPercentuale(string memory categoriaContabile, uint percentuale) public {
        int posizioneCategoria = findPosizioneCategoria(categoriaContabile);
        if( posizioneCategoria >= 0){
                    arrayContabilita[uint(posizioneCategoria)].percentuale -= percentuale;
        } 
    }
        
  
    
    
}