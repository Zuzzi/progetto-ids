/*
Deployer Contratto singolo:
Va messo nella stessa directory del file .sol e 
richiede come argomento il nome del contratto che deve essere lo stesso del file .sol
es. smartContract.sol -> smartContract contratto {...
Produce un file in output che contiene l'ABI e l'Indirizzo nella blockchain dove riesede il contratto appena creato
e un altro file che contiene il bytecode del contratto
*/

// API node per interagire con il File System
const fs = require('fs');
// Solidity Compiler 
const solc = require('solc');
// API Ethereum 
const Web3 = require('web3');

const argv = process.argv;
const contractName = argv[2]


// Parametri di configurazione del Wrapper web3
const options = {
    defaultAccount: "0xed9d02e382b34818e88b88a309c7fe71e65f419d",
    defaultGasPrice: 0,
    defaultGas: 4500000,
	transactionConfirmationBlocks: 6
}
// Costruisce il Wrapper di moduli ethereum web3
// Per la comunicazione con il nodo utilizza il procollo Websocket
const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:22000"), null, options);

// Importa il codice dello smartcontract
const inputfile = fs.readFileSync(contractName + '.sol').toString();
//Costruisce la standard-JSON-input-interface (solc > 0.5)
const input ={
	language: 'Solidity',
	sources : {
		[contractName + '.sol']: {
			content: inputfile
		}
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*']
			}
		}
	}
};
// Compila lo Smart Contract
const compiled = solc.compile(JSON.stringify(input));
const output = (JSON.parse(compiled));
console.log('Contract Compiled')
// Estrae l'abi e il bytecode del contratto compilato
const logStream = fs.createWriteStream(contractName+'.txt');
logStream.write('Contract "'+contractName+'" Deploy Info\n\n');
var abi = output.contracts[contractName + '.sol'][contractName].abi;
logStream.write('Contract ABI:\n'+ JSON.stringify(abi)+'\n\n');
var bytecode = output.contracts[contractName + '.sol'][contractName].evm.bytecode.object;
// Costruisce l'oggetto contratto (web3) dall'abi
const contract = new web3.eth.Contract(abi);

//Scrive il bytecode del contratto in un file .bin
const binStream = fs.createWriteStream(contractName+'.bin');
binStream.end('0x'+bytecode);

// Parametri utilizzati nel deploy
const deploy_options = {
    data: '0x' + bytecode,
    arguments: []
};

// Deploy SmartContract con messaggi di log negli eventi delle varie fasi
function deploy() {
	console.log('Start Deploying Contract...');
contract.deploy(deploy_options)
    .send()
	.on('error', (error) => {console.log('Errore:' + error)})
	.on('transactionHash', (transactionHash) => { console.log('Transaction Hash:' + transactionHash) })
	.on('receipt', (receipt) => {
		console.log('Receipt:' + receipt.contractAddress) // contains the new contract address
	})
	.on('confirmation', (confirmationNumber, receipt) => {console.log('Confirmation Number:' + confirmationNumber) })
	.then((newContractInstance) => {console.log('New Contract Address:' + newContractInstance.options.address +'\nConstract Successfully Deployed!');
									logStream.end('Deployed Contract Address:"'+ newContractInstance.options.address +'"\n');
									process.exit(0);})
	.catch(error => {console.log('Error occurred during deploy:\n'+ error);
					process.exit(1)}); 
}
deploy();