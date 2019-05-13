pragma solidity >=0.5 <0.6.0;

import './ContractParametri.sol';

contract ContractGiornale {
    
    struct Giornale {
        uint no;
        uint data;
        string descrizioneLocazione;
        string allegati;
    }
    
    struct Operaio {
        string nome;
        string cognome;
        string qualifica;
        uint orePresenza;
        uint data; //riferimento alla volce del giornale in cui è presente
    }
    
    struct Attrezzatura {
        string tipologia;
        uint quantita;
        uint data; //riferimento alla volce del giornale in cui è presente
    }
    
    mapping (uint => Operaio) public arrayOperai;
    mapping (uint => Attrezzatura) public arrayAttrezzature;
    ContractParametri cp;
    uint public numeroGiornale;
    uint public numeroOperai;
    uint public numeroAttrezzature;
    mapping (uint => Giornale) public arrayGiornale; 


    modifier onlyDirettore {
        require(cp.getIndirizzoDirettore() == msg.sender); _;
    }
    
    constructor() public  {
        numeroGiornale = 0;
        numeroOperai = 0;
        numeroAttrezzature = 0;
    }
    
    
    function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    
    
    function inserisciOperaio(string memory nome, string memory cognome, string memory qualifica, uint orePresenza, uint data) public onlyDirettore {
        arrayOperai[numeroGiornale].nome = nome;
        arrayOperai[numeroGiornale].cognome = cognome;
        arrayOperai[numeroGiornale].qualifica = qualifica;
        arrayOperai[numeroGiornale].orePresenza = orePresenza;
        arrayOperai[numeroGiornale].data = data;
        numeroOperai ++;
    }
    
    
    function inserisciAttrezzatura(string memory tipologia, uint quantita, uint data) public onlyDirettore {
        arrayAttrezzature[numeroGiornale].tipologia = tipologia;
        arrayAttrezzature[numeroGiornale].quantita = quantita;
        arrayAttrezzature[numeroGiornale].data = data;
        numeroAttrezzature ++;
    }
    
    
    function inserisciVoceGiornale (uint data, string memory descrizioneLocazione,
                                    string memory allegati) public onlyDirettore {
        arrayGiornale[numeroGiornale].no = numeroGiornale;
        arrayGiornale[numeroGiornale].data = data;
        arrayGiornale[numeroGiornale].descrizioneLocazione = descrizioneLocazione;
        arrayGiornale[numeroGiornale].allegati = allegati;
        numeroGiornale ++;
    }
    
    
    function getVoceGiornale(uint index) public view returns (uint, string memory, string memory) {
        Giornale memory gio = arrayGiornale[index];
        return (gio.data, gio.descrizioneLocazione, gio.allegati);
    }
    
    
    function getOperai(uint index) public view returns (string memory, string memory, string memory, uint, uint) {
        Operaio memory operaio = arrayOperai[index];
        return (operaio.nome, operaio.cognome, operaio.qualifica, operaio.orePresenza, operaio.data);
    }
    
    
    function getAttrezzature(uint index) public view returns (string memory, uint, uint) {
        Attrezzatura memory attrezzatura = arrayAttrezzature[index];
        return (attrezzatura.tipologia, attrezzatura.quantita, attrezzatura.data);
    }
    
    
    function getVoceGiornaleByData(uint data) public view returns (uint, string memory, string memory) {
        bool voceTrovata = false;
        uint posizione = 0;
        for (uint i = 0; i< numeroGiornale && !voceTrovata; i++) {
            if (data == arrayGiornale[i].data){                 {
                  voceTrovata = true;
                  posizione = i;
                } 
            }
        return (arrayGiornale[posizione].data, arrayGiornale[posizione].descrizioneLocazione, 
                arrayGiornale[posizione].allegati);
        }
    
    }
    
    
    
    
    
}