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
    bool approvata;
    }
    
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
    
    /*
    struct Categoria {
        string nomeCategoria;
        uint[] arrayPercentuali;
    }*/
    
    Misura[] arrayMisure;
    Contabilita[] arrayContabilita;
    /*Categoria[] arrayCategorie;*/
    
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
    bool invalidabile,
    bool approvata) public onlyDirettore {
        Misura memory nuovaMisura = Misura(no, tariffa, data, categoriaContabile, descrizione, percentuale, riserva, valida, invalidabile, approvata);
        arrayMisure.push(nuovaMisura);
    }
    
    function getMisura(uint index) public view returns (uint, string memory, uint, string memory, uint, string memory,bool,bool, bool) {
        Misura memory mis = arrayMisure[index];
        return (mis.no, mis.tariffa, mis.data, mis.descrizione, mis.percentuale, mis.riserva, mis.valida, mis.invalidabile, mis.approvata);
    }
    
    function getMisuraByNo(uint index) public view returns (uint, string memory, uint, string memory, uint, string memory,bool,bool, bool) {
        bool misuraTrovata = false;
        uint posizione = 0;
        for (uint i = 0; i< arrayMisure.length && !misuraTrovata; i++) {
            if (arrayMisure[i].no == index) {
                misuraTrovata = true;
                posizione = i;
            }
        }
        return (arrayMisure[posizione].no, arrayMisure[posizione].tariffa, arrayMisure[posizione].data, 
                arrayMisure[posizione].descrizione, arrayMisure[posizione].percentuale, arrayMisure[posizione].riserva,
                arrayMisure[posizione].valida, arrayMisure[posizione].invalidabile, arrayMisure[posizione].approvata);
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
    
    
    function approvaMisure() public onlyRup {
       for (uint i = 0; i< arrayMisure.length; i++) {
            if (!arrayMisure[i].approvata && arrayMisure[i].valida) {
                string memory categoriaContabile = arrayMisure[i].categoriaContabile;
                uint percentuale = arrayMisure[i].percentuale;
                int posizioneCategoria = findPosizioneCategoria(categoriaContabile);
                if( posizioneCategoria >= 0){
                    arrayContabilita[uint(posizioneCategoria)].percentuale += percentuale;
                } else {
                    Contabilita memory nuovaVoce;
                    creaNuovaVoce(nuovaVoce, categoriaContabile, percentuale);
                    arrayContabilita.push(nuovaVoce);
                }
                
                
            }
        }
   }


    function findPosizioneCategoria(string memory categoriaContabile) private returns (int) {
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
    
    function compareStrings (string memory a, string memory b)  private returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
       }
       
    function creaNuovaVoce (Contabilita memory nuovaVoce, string memory categoriaContabile, uint percentuale) private {
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
        
        
        
    }
    
