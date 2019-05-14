/*
Deployer Contratto SINGOLO:
Va messo nella stessa directory del file .sol e 
richiede come argomento il nome del contratto che deve essere lo stesso del file .sol
es. smartContract.sol -> smartContract contratto {...
*/

// API node per interagire con il File System
const fs = require('fs');
// Solidity Compiler 
//const solc = require('solc');
// API Ethereum 
const Web3 = require('web3');

const argv = process.argv;
const contractName = argv[2]


// Parametri di configurazione del Wrapper web3
const options = {
    defaultAccount: "0xed9d02e382b34818e88b88a309c7fe71e65f419d",
    defaultGasPrice: 0,
    defaultGas: 4500000,
	transactionConfirmationBlocks: 1
}
// Costruisce il Wrapper di moduli ethereum web3
// Per la comunicazione con il nodo utilizza il procollo Websocket
const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:22000",{
  // Opzioni connection Websocket
  clientConfig: {
	// Disattiva la frammentazione dei messaggi in modo da non "spezzare"
	// il bytecode dei contratti più grande di 16KB (valore default fragmentationThreshold")
	fragmentOutgoingMessages: false,
  }
}),null,options);

//Legge il bytecode e l'ABI del contratto dai file generati dal compiler
const bytecode =  fs.readFileSync(contractName + '.bin').toString();
const abi = JSON.parse(fs.readFileSync(contractName + '.txt').toString().match(/\[(.)*\]/)[0]);

// Costruisce l'oggetto contratto (web3) dall'abi
const contract = new web3.eth.Contract(abi);

// Parametri utilizzati nel deploy
const deploy_options = {
    data: bytecode,
    arguments: []
};

// Deploy SmartContract con messaggi di log negli eventi delle varie fasi
function deploy() {
	const logStream = fs.createWriteStream(contractName+'.txt',{flags:'a'});
	console.log('Start Deploying Contract...');
	const promise = new Promise (resolve =>  logStream.on('close', resolve));
contract.deploy(deploy_options)
    .send()
	.on('error', (error) => {console.log('Errore:' + error);
							process.exit(1)})
	.on('transactionHash', (transactionHash) => { console.log('Transaction Hash:' + transactionHash) })
	.on('receipt', (receipt) => {
		console.log('Receipt:' + receipt.contractAddress) // contains the new contract address
	})
	.on('confirmation', (confirmationNumber, receipt) => {console.log('Confirmation Number:' + confirmationNumber) })
	.then((newContractInstance) => {logStream.end('Deployed Contract Address:"'+ newContractInstance.options.address +'"\n');
									console.log('New Contract Address:' + newContractInstance.options.address +'\nConstract Successfully Deployed!');
									promise.then( () => process.exit(0));})
	.catch(error => {console.log('Error occurred during deploy:\n'+ error);
					process.exit(1)}); 
}
deploy();