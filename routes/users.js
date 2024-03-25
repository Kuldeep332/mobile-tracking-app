const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://0.0.0.0/mobiletracking').then(() => {
  console.log('connected to db');
});

const userSchema = mongoose.Schema({
   username:String,
   passwoard:String,
   image:String
    // phoneNumber: String
    
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);
