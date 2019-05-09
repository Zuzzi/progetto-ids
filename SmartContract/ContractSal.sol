pragma solidity >=0.5 <0.6.0;

import './ContractRegistro.sol';
import './ContractParametri.sol';

contract ContractSal {
    
    
    
    struct Sal {
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
    
    mapping (uint => Sal) arraySal;
    ContractParametri cp;
    uint numeroSal;
    uint parzialeLavoroAcorpo; //somma degli importi a debito
    uint aliquota; // percentuale del parziale lavoro a corpo
    uint totale; // è lo stesso valore del parziale lavoro a corpo
    uint pagamento; // valore della soglia
    
    modifier onlyRup {
        require(cp.getIndirizzoRup() == msg.sender); _;
    }
    
    function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    
    constructor() public  {
        numeroSal = 0;
    }
    
    function approvaRegistro() public onlyRup {
        /* Calcolo valore parziale (metodo del ContractRegistro),
        confronto con la prima soglia da raggiungere,
        se superata, tutti i valori di arrayContabilità vengono copiati sull'arraySal
        
    }
    
    
    
    
    

    
    
    
}