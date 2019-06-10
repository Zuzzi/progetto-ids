const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const smartContractSchema = new Schema({
  address: { type: String, required: true }
})

// const modulesSchema = new Schema({
//   giornaleLavori: { type: moduleSchema, required: true },
//   librettoMisure: { type: moduleSchema, required: true },
//   registroContabile: { type: moduleSchema, required: true },
//   sal: { type: moduleSchema, required: true }
// })

const contractSchema = new Schema({
  nome: { type: String, required: true},
  libretto: { type: smartContractSchema, required: true},
  giornale: { type: smartContractSchema, required: true},
  registro: { type: smartContractSchema, required: true},
  parametri: { type: smartContractSchema, required: true},
  sal: { type: smartContractSchema, required: true}
  // address: { type: String, required: true },
  // modules: { type: modulesSchema, required: true},
}, { collection : 'Contracts' });

const contract = mongoose.model('Contract', contractSchema);
 
module.exports = contract;