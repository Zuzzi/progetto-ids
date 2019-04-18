const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: { type: String }
}, { collection : 'Users' });
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;