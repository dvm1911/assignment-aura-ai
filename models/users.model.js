const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

  userName: {
    type: String,
    required: true
  },
  
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  
  userPassword: {
    type: String,
    required: true
  },

  userPfp: {
    type: String,
  },

  userDocuments: {
    type: Array
  }
}
);

const users = mongoose.model('users', userSchema);

module.exports = users;