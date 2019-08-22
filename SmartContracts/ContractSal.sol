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
    
    ContractParametri cp;
    ContractRegistro cr;
    
    mapping (uint => Sal) sal;
    uint public numeroSal = 0;

    int128 totaleLavoriAcorpo = 0; //somma degli importi a debito
    int128 percentualeLavoriAcorpo = 0; // percentuale del parziale lavoro a corpo
    int128 totalePagato = 0; // valore della soglia
    
    modifier onlyRup { require(cp.getIndirizzoRup() == msg.sender); _; }
    
    function setIndirizzoCp (address indirizzo) public {
        cp = ContractParametri(indirizzo);
    }
    function setIndirizzoCr (address indirizzo) public {
        cr = ContractRegistro(indirizzo);
    }
    
    constructor() public  { }
    
    function getSal(uint index) public view returns (uint, string memory, uint, string memory, string memory, int128, int128, int128, int128, int128) {
        Sal memory voceSal = sal[index];
        return (voceSal.no, voceSal.tariffa, voceSal.data, voceSal.categoriaContabile, voceSal.descrizione, 
                voceSal.percentuale, voceSal.prezzoValore, voceSal.prezzoPercentuale, voceSal.debitoValore, 
                voceSal.debitoPercentuale);
    }
    
    function approvaRegistro() public onlyRup {
        /* Calcolo valore parziale (metodo del ContractRegistro),
        confronto con la prima soglia da raggiungere,
        se superata, tutti i valori di arrayContabilit� vengono copiati sull'sal */
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
            //percentualeLavoriAcorpo = (totaleLavoriAcorpo*100)/cp.getValoreTotale();
            percentualeLavoriAcorpo = Math64.div(Math64.mul(totaleLavoriAcorpo,1.8446744073709552e21),cp.valoreTotale());
            totalePagato = minValue;
            cp.setSogliaSuperata(idSoglia);
        }
        
    }
    
    function creaNuovaVoceSal(string memory tariffa, string memory categoriaContabile, string memory descrizione, 
                int128 percentuale, int128 prezzoValore, int128 prezzoPercentuale, int128 debitoValore, 
                int128 debitoPercentuale) public   {
                    sal[numeroSal] = Sal({
                        no: numeroSal,
                        tariffa: tariffa,
                        data: now,
                        categoriaContabile: categoriaContabile,
                        descrizione: descrizione,
                        percentuale: percentuale,
                        prezzoValore: prezzoValore,
                        prezzoPercentuale: prezzoPercentuale,
                        debitoValore: debitoValore,
                        debitoPercentuale:debitoPercentuale
                    });
                    numeroSal++;
    }
    
    function getInfoPagamento() public view returns (int128, int128, int128) {
        return (totaleLavoriAcorpo, percentualeLavoriAcorpo, totalePagato);
    }
    
}