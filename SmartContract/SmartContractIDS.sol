pragma solidity >=0.5 <0.6.0;

contract SmartContractIDS {
    
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
    }
    
    struct Contabilita {
    uint no;
    string tariffa;
    string data;
    string categoriaContabile;
    string descrizione;
    uint percentuale;
    uint prezzoValore;
    uint prezzoPercentuale;
    uint debitoValore;
    uint debitoPercentuale;
    }
    
    Misura[] arrayMisure;
    Contabilita[] arrayContabilita;
    
    address private rup;
    address  direttore;
    
    uint parzialeLavoroAcorpo;
    uint aliquota;
    uint totale;
    uint pagamento;
    
     modifier onlyRup {
        require(rup == msg.sender); _;
    }
    
     modifier onlyDirettore {
        require(direttore == msg.sender); _;
    }
    
    constructor() public {
        direttore = msg.sender;
        rup = msg.sender;
    }
    
    
    function inserisciMisura(uint no,
    string memory tariffa,
    uint data,
    string memory categoriaContabile,
    string memory descrizione,
    uint percentuale,
    string memory riserva,
    bool valida,
    bool invalidabile) public onlyDirettore {
        Misura memory nuovaMisura = Misura(no, tariffa, data, categoriaContabile, descrizione, percentuale, riserva, valida, invalidabile);
        arrayMisure.push(nuovaMisura);
    }
    
    function getArrayMisure(uint index) public view returns (uint, string memory, uint, string memory, uint, string memory,bool,bool) {
        Misura memory mis = arrayMisure[index];
        return (mis.no, mis.tariffa, mis.data, mis.descrizione, mis.percentuale, mis.riserva, mis.valida, mis.invalidabile);
    }
    
    function invalidaMisura(uint noDaInvalidare) public onlyDirettore {
        bool misuraTrovata = false;
        uint posizione = 0;
        for (uint i = 0; i< arrayMisure.length && !misuraTrovata; i++) {
            if (arrayMisure[i].no == noDaInvalidare) {
                misuraTrovata = true;
                posizione = i;
            }
        }
        arrayMisure[posizione].valida = false;
    }
    
}
    