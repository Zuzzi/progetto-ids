pragma solidity >=0.5 <0.6.0;

import './ContractRegistro.sol';

contract ContractMisure {
    
    struct Misura {
    uint no;
    string tariffa;
    uint data;
    string categoriaContabile;
    string descrizione;
    uint percentuale;
    string riserva;
    bool valida;
    bool invalidabile;
    bool approvata;
    }
    
    
    
    uint parzialeLavoroAcorpo;
    uint aliquota;
    uint totale;
    uint pagamento;
    uint public numeroMisure;
    ContractRegistro cr;
    address direttore;
    
    mapping (uint => Misura) public arrayMisure; 
    

    
    
    constructor() public {
        direttore = msg.sender;
        numeroMisure = 0;
    }
    
    
    modifier onlyDirettore {
        require(direttore == msg.sender); _;
    }
    
    
    function setIndirizzoCr (address indirizzo) public {
        cr = ContractRegistro(indirizzo);
    }
    
    
    function inserisciMisura(uint no,
    string memory  tariffa,
    uint data,
    string memory categoriaContabile,
    string memory descrizione,
    uint percentuale,
    string memory riserva,
    bool valida,
    bool invalidabile,
    bool approvata) public onlyDirettore {
        
        arrayMisure[no].no = no;
        arrayMisure[no].tariffa = tariffa;
        arrayMisure[no].data = data;
        arrayMisure[no].categoriaContabile = categoriaContabile;
        arrayMisure[no].descrizione = descrizione;
        arrayMisure[no].percentuale = percentuale;
        arrayMisure[no].riserva = riserva;
        arrayMisure[no].valida = valida;
        arrayMisure[no].invalidabile = invalidabile;
        arrayMisure[no].approvata = approvata;
        //arrayMisure.push(nuovaMisura);
        numeroMisure ++;
    }
    
    function getMisura(uint index) public view returns (uint, string memory, uint, string memory, string memory, uint, string memory,bool,bool, bool) {
        Misura memory mis = arrayMisure[index];
        return (mis.no, mis.tariffa, mis.data, mis.categoriaContabile, mis.descrizione, mis.percentuale, mis.riserva, mis.valida, mis.invalidabile, mis.approvata);
    }
    
    /*function getMisuraByNo(uint index) public view returns (uint, string memory, uint, string memory, string memory, uint, string memory,bool,bool, bool) {
        bool misuraTrovata = false;
        uint posizione = 0;
        for (uint i = 1; i<= numeroMisure && !misuraTrovata; i++) {
            if (arrayMisure[i].no == index) {
                misuraTrovata = true;
                posizione = i;
            }
        }
        return (arrayMisure[posizione].no, arrayMisure[posizione].tariffa, arrayMisure[posizione].data, arrayMisure[posizione].categoriaContabile, 
                arrayMisure[posizione].descrizione, arrayMisure[posizione].percentuale, arrayMisure[posizione].riserva,
                arrayMisure[posizione].valida, arrayMisure[posizione].invalidabile, arrayMisure[posizione].approvata);
    }
    
    */
    
    
    
    function invalidaMisura(uint noDaInvalidare) public onlyDirettore {
        bool misuraTrovata = false;
        uint posizione = 0;
        uint percentuale = 0;
        string memory categoriaContabile;
        for (uint i = 0; i< numeroMisure && !misuraTrovata; i++) {
            if (arrayMisure[i].no == noDaInvalidare) {
                misuraTrovata = true;
                posizione = i;
                categoriaContabile = arrayMisure[i].categoriaContabile;
                percentuale = arrayMisure[i].percentuale;
            }
        }
        arrayMisure[posizione].valida = false;
        if (arrayMisure[posizione].approvata){
            cr.stornoPercentuale(categoriaContabile, percentuale); 
        }
    }
    
    
    function approvaMisura  (uint index) public {
        arrayMisure[index].approvata = true;
    }

    
    
 
        
        
    }