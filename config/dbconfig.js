const mongoose = require('mongoose');

const connectDB = async () => {
  try {  await mongoose.connect(
    "mongodb+srv://docsave1911:dv_m1911@savedoc.lrjm1.mongodb.net/?retryWrites=true&w=majority&appName=savedoc");
  }catch(e){
    console.log("Can not connect to database" + e);
  }
}

module.exports = connectDB;