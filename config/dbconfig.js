const mongoose = require('mongoose');

const connectDB = async () => {
  try {  await mongoose.connect(
    "mongodb+srv://digmalik1911:dv_m1911@cluster0.rkthh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  }catch(e){
    console.log("Can not connect to database" + e);
  }
}

module.exports = connectDB;