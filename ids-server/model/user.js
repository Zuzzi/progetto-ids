const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: { type: String, required: true },
  keystore: { type: Object, required: true },
  contracts : { type: [{ type: Schema.Types.ObjectId, ref:'Contract' }] }
}, { collection : 'Users' });
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;