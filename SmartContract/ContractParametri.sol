pragma solidity >=0.5 <0.6.0;

contract ContractParametri {
    
    address private indirizzoDirettore;
    address private indirizzoRup;
    address private indirizzoDitta;
    Soglia[] private arraySoglie;
    CategoriaContabile[] private arrayCategorieContabili;
    string[] private arrayQualifiche;
    string[] private arrayAttrezzature;
    uint private valoreTotale;
    string[] private arrayStrutture;
    
    struct CategoriaContabile {
        string nome;
        uint valore;
        string tariffa;
    }
    
    struct Soglia {
        uint valore;
        bool superata;
    }
    
    
    
    
    constructor() public {
        indirizzoDirettore = msg.sender;
        indirizzoRup = msg.sender;
        indirizzoDitta = msg.sender;
        
        valoreTotale = 100000;
        
        CategoriaContabile memory cat1;
        cat1.nome = "Struttura di fondazione";
        cat1.valore = 30000;
        cat1.tariffa = "001.001.001";
        CategoriaContabile memory cat2;
        cat2.nome = "Struttura di elevazione";
        cat2.valore = 50000;
        cat2.tariffa = "001.001.002";
        CategoriaContabile memory cat3;
        cat3.nome = "Colonnato";
        cat3.valore = 15000;
        cat3.tariffa = "001.001.003";
        CategoriaContabile memory cat4;
        cat4.nome = "Pavimentazione";
        cat4.valore = 5000;
        cat4.tariffa = "001.001.004";
        
        arrayCategorieContabili.push(cat1);
        arrayCategorieContabili.push(cat2);
        arrayCategorieContabili.push(cat3);
        arrayCategorieContabili.push(cat4);
        
        //Soglia memory soglia1 = Soglia(5000, false);
        Soglia memory soglia1 = Soglia(1, false);
        arraySoglie.push(soglia1);
        Soglia memory soglia2 = Soglia(10000, false);
        arraySoglie.push(soglia2);
        Soglia memory soglia3 = Soglia(30000, false);
        arraySoglie.push(soglia3);
        Soglia memory soglia4 = Soglia(50000, false);
        arraySoglie.push(soglia4);
        Soglia memory soglia5 = Soglia(80000, false);
        arraySoglie.push(soglia5);
        Soglia memory soglia6 = Soglia(100000, false);
        arraySoglie.push(soglia6);


arrayQualifiche.push("MDO - Operaio Comune");
        arrayQualifiche.push("MDO - Operaio Specializzato");
        arrayQualifiche.push("MDO - Capo Squadra");
        
        arrayAttrezzature.push("MAC - Dumper");
        arrayAttrezzature.push("MAC - Gru a torre");
        arrayAttrezzature.push("MAC - Autocarro");
        
        arrayStrutture.push("Fabbricato A - Struttura");
        arrayStrutture.push("Fabbricato B - Struttura");
        arrayStrutture.push("Fabbricato C - Struttura");
    }
    
    function getIndirizzoDirettore() public view returns (address) {
                return (indirizzoDirettore);
    }
    
    function getIndirizzoRup() public view returns (address) {
                return (indirizzoRup);
    }
    
    function getIndirizzoDitta() public view returns (address) {
                return (indirizzoDitta);
    }
        
    function getSoglia(uint id) public view returns (uint, bool) {
                return (arraySoglie[id].valore, arraySoglie[id].superata);
    }   
     
     
    function getQualifica(uint id) public view returns (string memory) {
                return (arrayQualifiche[id]);
    }  
    
    function getAttrezzatura(uint id) public view returns (string memory) {
                return (arrayAttrezzature[id]);
    }
    
    function getCategoriaContabile(uint index) public view returns (string memory, uint, string memory) {
        CategoriaContabile memory cat = arrayCategorieContabili[index];
        return (cat.nome, cat.valore, cat.tariffa);
    }
    
    function getCategoriaContabileByNome(string memory nome) public view returns (string memory, uint, string memory) {
        bool categoriaTrovata = false;
        uint posizione = 0;
        for (uint i = 0; i< arrayCategorieContabili.length && !categoriaTrovata; i++) {
            if (compareStrings(arrayCategorieContabili[i].nome,nome)) {
                categoriaTrovata = true;
                posizione = i;
            }
        }
        return (arrayCategorieContabili[posizione].nome, arrayCategorieContabili[posizione].valore,
                arrayCategorieContabili[posizione].tariffa);
    }
    
    function getValoreTotale() public view returns (uint) {
        return (valoreTotale);
    }
    
    function getCategoriaLength() public view returns (uint) {
        return arrayCategorieContabili.length;
    }
    
    function getStrutture(uint id) public view returns (string memory) {
                return (arrayStrutture[id]);
    }
    
    function getStruttureLength() public view returns (uint) {
        return arrayStrutture.length;
    }
    
    function compareStrings (string memory a, string memory b)  private  pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }
    
    function getSoglieLength() public view returns (uint) {
        return arraySoglie.length;
    }
    
    function setSogliaSuperata(uint idSoglia) public {
        arraySoglie[idSoglia].superata = true;
    }
    
    

}