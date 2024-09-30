const mongoose = require('mongoose');

const connectDB = async () => {
  try {  await mongoose.connect(
    "mongodb+srv://coinScoreBE19:pxCS1911DB@coinscoredb.00jflct.mongodb.net/?retryWrites=true&w=majority&appName=coinScoreDB");
  }catch(e){
    console.log("Can not connect to database" + e);
  }
}

module.exports = connectDB;