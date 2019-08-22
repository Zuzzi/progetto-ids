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
    
    ContractRegistro cr;
    ContractParametri cp;
    
    mapping (uint => Misura) misure; 
    uint public numeroMisure = 0;

    constructor() public  { }
    
    modifier onlyDirettore { require(cp.getIndirizzoDirettore() == msg.sender); _;}
    
    function setIndirizzoCr (address indirizzo) public {
        cr = ContractRegistro(indirizzo);
    }
    
     function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    
    function getMisura(uint index) public view returns (uint, string memory, uint, string memory, string memory, int128, string memory,bool,bool, bool) {
        Misura memory mis = misure[index];
        return (mis.no, mis.tariffa, mis.data, mis.categoriaContabile, mis.descrizione, mis.percentuale, mis.riserva, mis.valida, mis.invalidabile, mis.approvata);
    }
    
    function inserisciMisura(string memory categoriaContabile,
                             string memory descrizione, int128 percentuale, string memory riserva) public onlyDirettore {
        (string memory nomeCategoria, , string memory tariffa) = cp.getCategoriaContabileByNome(categoriaContabile);
        misure[numeroMisure] = Misura({
            no: numeroMisure,
            tariffa: tariffa,
            data: now,
            categoriaContabile: nomeCategoria,
            descrizione: descrizione,
            percentuale: percentuale,
            riserva: riserva,
            valida: true,
            invalidabile: true,
            approvata: false
        });
        numeroMisure ++;
    }
    
    function invalidaMisura(uint index) public onlyDirettore {
        misure[index].valida = false;
        if (misure[index].approvata){
            cr.stornoPercentuale(misure[index].categoriaContabile, misure[index].percentuale); 
        }
    }
    
    function approvaMisura  (uint index) public {
        misure[index].approvata = true;
    }

}