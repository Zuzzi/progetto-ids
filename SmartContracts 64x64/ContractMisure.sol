pragma solidity >=0.5 <0.6.0;

import './ContractRegistro.sol';
import './ContractParametri.sol';

contract ContractMisure {
    
    struct Misura {
    uint no;
    string tariffa;
    uint data;
    string categoriaContabile;
    string descrizione;
    int128 percentuale;
    string riserva;
    bool valida;
    bool invalidabile;
    bool approvata;
    }
    
    uint public numeroMisure;
    ContractRegistro cr;
    ContractParametri cp;
    
    
    mapping (uint => Misura) private arrayMisure; 

    constructor() public  {
        numeroMisure = 0;
    }
    
    modifier onlyDirettore {
        require(cp.getIndirizzoDirettore() == msg.sender); _;
    }
    
    function setIndirizzoCr (address indirizzo) public {
        cr = ContractRegistro(indirizzo);
    }
    
     function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    
    function inserisciMisura(string memory categoriaContabile,
                             string memory descrizione, int128 percentuale, string memory riserva) public onlyDirettore {
        (string memory nomeCategoria, int128 valore, string memory tariffa) = cp.getCategoriaContabileByNome(categoriaContabile);
        arrayMisure[numeroMisure].no = numeroMisure;
        arrayMisure[numeroMisure].tariffa = tariffa;
        arrayMisure[numeroMisure].data = now;
        arrayMisure[numeroMisure].categoriaContabile = categoriaContabile;
        arrayMisure[numeroMisure].descrizione = descrizione;
        arrayMisure[numeroMisure].percentuale = percentuale;
        arrayMisure[numeroMisure].riserva = riserva;
        arrayMisure[numeroMisure].valida = true;
        arrayMisure[numeroMisure].invalidabile = true;
        arrayMisure[numeroMisure].approvata = false;
        numeroMisure ++;
    }
    
    function getMisura(uint index) public view returns (uint, string memory, uint, string memory, string memory, int128, string memory,bool,bool, bool) {
        Misura memory mis = arrayMisure[index];
        return (mis.no, mis.tariffa, mis.data, mis.categoriaContabile, mis.descrizione, mis.percentuale, mis.riserva, mis.valida, mis.invalidabile, mis.approvata);
    }
    
    
    function invalidaMisura(uint id) public onlyDirettore {

        arrayMisure[id].valida = false;
        if (arrayMisure[id].approvata){
            cr.stornoPercentuale(arrayMisure[id].categoriaContabile, arrayMisure[id].percentuale); 
        }
    }
    
    function approvaMisura  (uint index) public {
        arrayMisure[index].approvata = true;
    }

    
    
 
        
        
    }