const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const contractSchema = new Schema({
  type: { type: String, required: true},
  abi: { type: [Object], required: true },
  bytecode: { type: String, required: true},
}, { collection : 'ContractSources' });

const contractSource = mongoose.model('ContractSource', contractSchema);
 
module.exports = contractSource;