const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: { type: String, required: true },
  data: { type: Date, required: true },
  codiceFiscale: { type: String, required: true },
  residenza: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: Number, required: true, validate: { validator: Number.isInteger, message : '{VALUE} non è intero'} },
  citta: { type: String, required: true },
  provincia: { type: String, required: true },
  CAP: { type: Number, required: true, validate: { validator: Number.isInteger, message : '{VALUE} non è intero'} },
  keystore: { type: Object, required: true },
  contracts : { type: [{ type: Schema.Types.ObjectId, ref:'Contract' }] }
}, { collection : 'Users' });
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;