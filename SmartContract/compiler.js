/*
Compiler Contratti:
- Va messo nella stessa directory dei file .sol e richiede come argomenti i nomi dei contratti.
es. >node compiler smartContract1 smartContract2 smartContract3 
- Il nome del contratto deve essere lo stesso del file .sol
es. smartContract.sol -> smartContract contratto {...
- Per ogni contratto produce due file in output: uno che contiene l'ABI del contratto 
e un altro che contiene il bytecode del contratto
*/

// API node per interagire con il File System
const fs = require('fs');
// Solidity Compiler 
const solc = require('solc');

const argv = process.argv;

const sourceFiles = {};

// Importa il codice degli Smart Contract 
argv.slice(2).forEach( contractName => {
	let inputFile = fs.readFileSync(contractName + '.sol').toString();
	sourceFiles[contractName + '.sol'] = {content: inputFile};
	});

//Costruisce la standard-JSON-input-interface (solc web> 0.5)
const input ={
	language: 'Solidity',
	sources : sourceFiles,
	settings: {
		outputSelection: { 
			'*': {
				'*': ['*']
			}
		}
	}
};
// Compila gli Smart Contract
const compiled = solc.compile(JSON.stringify(input));
const output = (JSON.parse(compiled));
console.log('Contracts Compiled');

const promises = [];
// Estrae ABI e bytecode di ogni contratto:
argv.slice(2).forEach(contractName => {
	// Estrae l'ABI e lo scrive in un file .txt
	let abi = output.contracts[contractName + '.sol'][contractName].abi;
	const logStream = fs.createWriteStream(contractName+'.txt');
	//logStream.write('Contract "'+contractName+'" Deploy Info\n\n');
	logStream.end('Contract ABI:\n'+ JSON.stringify(abi)+'\n\n');
	promises.push(new Promise (resolve =>  logStream.on('close', resolve))); 
	// Estrae il bytecode e lo scrive in un file .bin (con l'hex notation "0x")
	let bytecode = output.contracts[contractName + '.sol'][contractName].evm.bytecode.object;
	const binStream = fs.createWriteStream(contractName+'.bin');
	binStream.end('0x'+bytecode);
	promises.push(new Promise (resolve =>  binStream.on('close', resolve))); 
})
Promise.all(promises).then(() => {console.log('Files Generated'); process.exit(0)});

