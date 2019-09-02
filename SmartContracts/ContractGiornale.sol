pragma solidity >=0.5 <0.6.0; 

pragma experimental ABIEncoderV2;

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
    }
    
    struct Attrezzatura {
        string tipologia;
        uint quantita;
    }
    
    ContractParametri cp;
    
    mapping (uint => Giornale) giornali;
    
    mapping (uint => Operaio[]) operai;
    
    mapping (uint => Attrezzatura[]) attrezzature;
    
    
    constructor() public  { }
    
    modifier onlyDirettore {
        require(cp.getIndirizzoDirettore() == msg.sender); _;
    }
    
    function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    
    function inserisciGiornale(Giornale memory nuovoGiornale, Operaio[] memory nuoviOperai,
        Attrezzatura[] memory nuoveAttrezzature) public onlyDirettore {
            uint data = nuovoGiornale.data;
            giornali[data] = nuovoGiornale;
            for (uint i =0; i< nuoviOperai.length; i++) {
                operai[data].push(nuoviOperai[i]);
            }
            for (uint i =0; i< nuoveAttrezzature.length; i++) {
                attrezzature[data].push(nuoveAttrezzature[i]);
            }
    }
    
    function getGiornale(uint data) public view returns (Giornale memory, Operaio[] memory, Attrezzatura[] memory) {
        return (giornali[data], operai[data], attrezzature[data]);
    }
    
}