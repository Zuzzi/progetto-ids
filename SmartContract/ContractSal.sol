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
    uint public numeroSal;
    ContractParametri cp;
    ContractRegistro cr;

    uint totaleLavoriAcorpo; //somma degli importi a debito
    uint aliquota; // percentuale del parziale lavoro a corpo
    uint pagamento; // valore della soglia
    
    modifier onlyRup {
        require(cp.getIndirizzoRup() == msg.sender); _;
    }
    
    function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    function setIndirizzoCr (address indirizzo) public {
        cr = ContractRegistro(indirizzo);
    }
    
    constructor() public  {
        numeroSal = 0;
    }
    
    function approvaRegistro() public onlyRup {
        /* Calcolo valore parziale (metodo del ContractRegistro),
        confronto con la prima soglia da raggiungere,
        se superata, tutti i valori di arrayContabilità vengono copiati sull'arraySal */
        
        uint valoreParziale = cr.calcoloValoreParziale();
        (uint minValue, bool minSuperata, uint idSoglia) = cr.findMinSogliaNotSuperata();
        if (valoreParziale >= minValue && !minSuperata) {
            for (uint i = 0; i<cr.numeroContabilita(); i++) {

                (, string memory tariffa,, string memory categoriaContabile, string memory descrizione, 
                uint percentuale, uint prezzoValore, uint prezzoPercentuale, uint debitoValore, 
                uint debitoPercentuale, bool pagata) = cr.getContabilita(i);
                
                if (!pagata) {
                    creaNuovaVoceSal(tariffa, categoriaContabile, descrizione, percentuale, prezzoValore,
                                     prezzoPercentuale, debitoValore, debitoPercentuale);
                    cr.pagataContabilita(i);
                }
            }
            
            totaleLavoriAcorpo = valoreParziale;
            aliquota = (totaleLavoriAcorpo*100)/cp.getValoreTotale();
            pagamento = minValue;
            cp.setSogliaSuperata(idSoglia);
        }
        
    }
    
    function creaNuovaVoceSal(string memory tariffa, string memory categoriaContabile, string memory descrizione, 
                uint percentuale, uint prezzoValore, uint prezzoPercentuale, uint debitoValore, 
                uint debitoPercentuale) public   {
                    
                    arraySal[numeroSal].no = numeroSal;
                    arraySal[numeroSal].tariffa = tariffa;
                    arraySal[numeroSal].data = now;
                    arraySal[numeroSal].categoriaContabile = categoriaContabile;
                    arraySal[numeroSal].descrizione = descrizione;
                    arraySal[numeroSal].percentuale = percentuale;
                    arraySal[numeroSal].prezzoValore = prezzoValore;
                    arraySal[numeroSal].prezzoPercentuale = prezzoPercentuale;
                    arraySal[numeroSal].debitoValore = debitoValore;
                    arraySal[numeroSal].debitoPercentuale = debitoPercentuale;
                    numeroSal++;
                
    }
    
    function getSal(uint index) public view returns (uint, string memory, uint, string memory, string memory, uint, uint, uint, uint, uint) {
        Sal memory sal = arraySal[index];
        return (sal.no, sal.tariffa, sal.data, sal.categoriaContabile, sal.descrizione, 
                sal.percentuale, sal.prezzoValore, sal.prezzoPercentuale, sal.debitoValore, 
                sal.debitoPercentuale);
    }
 
    
}