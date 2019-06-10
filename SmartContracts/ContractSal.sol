pragma solidity >=0.5 <0.6.0;

import './ContractRegistro.sol';
import './ContractParametri.sol';
import { ABDKMath64x64 as Math64 } from './ABDKMath64x64.sol';

contract ContractSal {
    
    
    
    struct Sal {
    uint no;
    string tariffa;
    uint data;
    string categoriaContabile;
    string descrizione;
    int128 percentuale;
    int128 prezzoValore;
    int128 prezzoPercentuale;
    int128 debitoValore;
    int128 debitoPercentuale;
    }
    
    mapping (uint => Sal) arraySal;
    uint public numeroSal;
    ContractParametri cp;
    ContractRegistro cr;

    int128 totaleLavoriAcorpo; //somma degli importi a debito
    int128 aliquota; // percentuale del parziale lavoro a corpo
    int128 pagamento; // valore della soglia
    
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
        totaleLavoriAcorpo = 0;
        aliquota = 0;
        pagamento = 0;
    }
    
    function approvaRegistro() public onlyRup {
        /* Calcolo valore parziale (metodo del ContractRegistro),
        confronto con la prima soglia da raggiungere,
        se superata, tutti i valori di arrayContabilit� vengono copiati sull'arraySal */
        
        int128 valoreParziale = cr.calcoloValoreParziale();
        (int128 minValue, bool minSuperata, uint idSoglia) = cr.findMinSogliaNotSuperata();
        if (valoreParziale >= minValue && !minSuperata) {
            for (uint i = 0; i<cr.numeroContabilita(); i++) {

                (, string memory tariffa,, string memory categoriaContabile, string memory descrizione, 
                int128 percentuale, int128 prezzoValore, int128 prezzoPercentuale, int128 debitoValore, 
                int128 debitoPercentuale, bool pagata) = cr.getContabilita(i);
                
                if (!pagata) {
                    creaNuovaVoceSal(tariffa, categoriaContabile, descrizione, percentuale, prezzoValore,
                                     prezzoPercentuale, debitoValore, debitoPercentuale);
                    cr.pagataContabilita(i);
                }
            }
            
            totaleLavoriAcorpo = valoreParziale;
            //aliquota = (totaleLavoriAcorpo*100)/cp.getValoreTotale();
            aliquota = Math64.div(Math64.mul(totaleLavoriAcorpo,1.8446744073709552e21),cp.getValoreTotale());
            pagamento = minValue;
            cp.setSogliaSuperata(idSoglia);
        }
        
    }
    
    function creaNuovaVoceSal(string memory tariffa, string memory categoriaContabile, string memory descrizione, 
                int128 percentuale, int128 prezzoValore, int128 prezzoPercentuale, int128 debitoValore, 
                int128 debitoPercentuale) public   {
                    
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
    
    function getInfoPagamento() public view returns (int128, int128, int128) {
        return (totaleLavoriAcorpo, aliquota, pagamento);
    }
    
    function getSal(uint index) public view returns (uint, string memory, uint, string memory, string memory, int128, int128, int128, int128, int128) {
        Sal memory sal = arraySal[index];
        return (sal.no, sal.tariffa, sal.data, sal.categoriaContabile, sal.descrizione, 
                sal.percentuale, sal.prezzoValore, sal.prezzoPercentuale, sal.debitoValore, 
                sal.debitoPercentuale);
    }
 
    
}