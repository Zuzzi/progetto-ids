pragma solidity >=0.5 <0.6.0;

contract ContractParametri {
    
    struct CategoriaContabile {
        string nome;
        int128 valore;
        string tariffa;
    }
    
    struct Soglia {
        uint no;
        int128 valore;
        bool superata;
    }
    
    address private indirizzoDirettore;
    address private indirizzoRup;
    address private indirizzoDitta;
    
    mapping (uint => Soglia) soglie;
    uint public numeroSoglie;
    
    mapping (uint => CategoriaContabile) categorieContabili;
    uint public numeroCategorieContabili;
    
    mapping (uint => string) strutture;
    uint public numeroStrutture;
    
    mapping (uint => string) qualifiche;
    uint public numeroQualifiche;
    
    mapping (uint => string) attrezzature;
    uint public numeroAttrezzature;
    
    int128 public valoreTotale;
    
    constructor(address direttore, address rup,address ditta) public {
        indirizzoDirettore = direttore;
        indirizzoRup = rup;
        indirizzoDitta = ditta;
        
        soglie[0] = Soglia(0, 18446744073709552000, false);
        soglie[1] = Soglia(1, 1.844674407370955e23, false); 
        soglie[2] = Soglia(2, 5.5340232221128655e23, false);
        soglie[3] = Soglia(3, 9.223372036854776e23, false);
        soglie[4] = Soglia(4, 1.475739525896764e24, false);
        soglie[5] = Soglia(5, 1.8446744073709552e24, false);
        numeroSoglie = 6;
        
        categorieContabili[0] = CategoriaContabile("Struttura di fondazione", 5.5340232221128655e23, "001.001.001");
        categorieContabili[1] = CategoriaContabile("Struttura di elevazione", 9.223372036854776e23, "001.001.002");
        categorieContabili[2] = CategoriaContabile("Colonnato", 2.7670116110564327e23, "001.001.003");
        categorieContabili[3] = CategoriaContabile("Pavimentazione", 9.223372036854776e22, "001.001.004");
        numeroCategorieContabili = 4;
        
        strutture[0] = "Fabbricato A - Struttura";
        strutture[1] = "Fabbricato B - Struttura";
        strutture[2] = "Fabbricato C - Struttura";
        numeroStrutture = 3;

        qualifiche[0] = "MDO - Operaio Comune";
        qualifiche[1] = "MDO - Operaio Specializzato";
        qualifiche[2] = "MDO - Capo Squadra";
        numeroQualifiche = 3;
        
        attrezzature[0] = "MAC - Dumper";
        attrezzature[1] = "MAC - Gru a torre";
        attrezzature[2] = "MAC - Autocarro";
        numeroAttrezzature = 3;
        
        valoreTotale = 1.8446744073709552e24;
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
        
    function getSoglia(uint index) public view returns (uint, int128, bool) {
        return (soglie[index].no, soglie[index].valore, soglie[index].superata);
    }
    
    function setSogliaSuperata(uint index) public {
        soglie[index].superata = true;
    }
    
    function getCategoriaContabile(uint index) public view returns (string memory, int128, string memory) {
        CategoriaContabile memory cat = categorieContabili[index];
        return (cat.nome, cat.valore, cat.tariffa);
    }
    
    function getCategoriaContabileByNome(string memory nome) public view returns (string memory, int128, string memory) {
        bool categoriaTrovata = false;
        uint posizione = 0;
        for (uint i = 0; i< numeroCategorieContabili && !categoriaTrovata; i++) {
            if (compareStrings(categorieContabili[i].nome, nome)) {
                categoriaTrovata = true;
                posizione = i;
            }
        }
        return (categorieContabili[posizione].nome, categorieContabili[posizione].valore,
                categorieContabili[posizione].tariffa);
    }
    
    function getStruttura(uint index) public view returns (string memory) {
                return (strutture[index]);
    }

    function getQualifica(uint index) public view returns (string memory) {
        return (qualifiche[index]);
    }  
    
    function getAttrezzatura(uint index) public view returns (string memory) {
        return (attrezzature[index]);
    }

    function compareStrings (string memory a, string memory b)  private  pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }

}