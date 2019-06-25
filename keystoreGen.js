
const Web3 = require('web3');
const fs = require('fs');
const web3 = new Web3('http://localhost:22000');
const newAccount = web3.eth.accounts.create();
const privateKey = newAccount.privateKey;
const password = process.argv[2];
console.log(password);
const keystore = web3.eth.accounts.encrypt(privateKey,password);
const writeStream = fs.createWriteStream('keystore.txt');
writeStream.end(JSON.stringify(keystore));
console.log('Password: ' + password);
console.log('Private Key: ' + privateKey);

writeStream.on('close', () => {console.log('KeyStore Generated !'); 
								process.exit(0);});
