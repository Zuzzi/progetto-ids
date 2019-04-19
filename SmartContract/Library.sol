pragma solidity ^0.4.17;

library Library {
    
    struct Misura {
    uint no;
    string tariffa;
    string data;
    string categoriaContabile;
    string descrizione;
    uint percentuale;
    string riserva;
    bool valida;
    bool invalidabile;
    }
    
    struct Contabilita {
    uint no;
    string tariffa;
    string data;
    string categoriaContabile;
    string descrizione;
    uint percentuale;
    uint prezzoValore;
    uint prezzoPercentuale;
    uint debitoValore;
    uint debitoPercentuale;
    }
}