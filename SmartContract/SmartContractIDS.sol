pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;
import "browser/Library.sol";

contract SmartContractIDS {
    
    Library.Misura[] arrayMisure;
    Library.Contabilita[] arrayContabilita;
    
    address private rup;
    address private direttore;
    
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
    
    function inserisciMisura(Library.Misura nuovaMisura) public onlyDirettore {
        arrayMisure.push(nuovaMisura);
    }
    
    function getArrayMisure() public view returns (Library.Misura[] memory) {
        return arrayMisure;
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
    
    function getArrayContabilita() public view onlyRup returns (Library.Contabilita[] memory) {
        return arrayContabilita;
    }
    
    function aggiornaArrayContabilita() public onlyRup {
        /*
        questo metodo scorre arrayMisure e raggruppando le misure 
        per categoria contabile somma le percentuali e fa calcoli (da controllare),
        poi inserisce/aggiorna la riga corrispondente nel registro di contabilità,
        cioè inserisce/aggiorna un elemento di arrayContabilità
        */
    }
    
}