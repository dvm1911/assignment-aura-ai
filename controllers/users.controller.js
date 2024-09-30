const users = require('../models/users.model.js');
const jwt = require('jsonwebtoken');

const tokenSecretKey = "49194f270d1bb055f9437bf79029bfef6afa4b798bb9a63964a9ce0654e76bebbd9492d7135fbfd48f2532eb31e026f5c11a5b7911e5fdad05d5290f48d9b7eef3a68aa1dd2f5f2537ec57e83ecca48f3a6a2075c1ae59b5bf941f072dfad81951efe0cdd90f90e43b7c6746a08936184122296b9fccee22ba34c20853747c7a16b4a36bd45ea75ec32cad2915808e769f9b5f06d1aaa3f55e1b075d6f65d636fa391908f023d1e7b8c2fbb4b566401b5e40b5eb2c7475c6c17c937cdfa1aae77d971e370f620922ded4c3a68c8920c1943f969de8ca605bf05cc2befc37b7e39d47764669b5828b3f30061847a11e7a9b2b930852a46831abbad9d36d9b3a5d";

//Sign Up
const signUp = async (req, res) => {
  try{
    const { userName, userOwnerName, userEmail, userPassword, isAdmin } = req.body;
    const user = new users({
      userName,
      userEmail,
      userPassword
    });
    const savedUser = await user.save();
    res.status(201).json({status: 'Success'});
  }catch(err){ 
    res.status(500).json({status: 'Error', message: err.message});
  }
};

//Log In
const logIn = async (req, res) => {
 try{
   const user = await users.findOne({userEmail: req.body.userEmail});
   if(!user){
     res.status(401).json({status: 'Error', message: 'Username not found'});
   }
   else if (user.userPassword !== req.body.userPassword){
     res.status(401).json({status: 'Error', message: 'Incorrect password'});
   }

   const token = jwt.sign({tokenId: user.id}, tokenSecretKey);
   res.status(200).json({status: 'Success', message: user, token: token });
   
 }
   catch (err) {
    res.status(500).json({status: 'Error', message: err.message});
   }
}

//tokenAuth
const tokenAuth = async (req, res) => {
  try{
    const id = req.user.tokenId;

    const user = await users.findById(id);

    if(!user){
      return res.status(404).json({ message: "User Not Found"});
    }
    res.status(200).json(user);

  } catch(err){ 
    res.status(500).json({status: 'Error', message: err.message});
  } 
}


const fetchUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userFetched = await users.findById(id);
    if(!userFetched) {
      return res.status(404).json({ message: "User Not Found"})
    }
    res.status(200).json(userFetched);
    
  } catch (error) {
    res.status(500).json({status: "Error", data: { errMessage: "We are not able to process your request. Please try again after sometime" }});
  }
}


const updateUserById = async (req, res) => {
  try { 
    const id = req.params.id;
    const userFetched = await users.findById(id);
    if(!userFetched) {
      return res.status(404).json({ message: "User Not Found"})
    }
    const userUpdated = await users.findByIdAndUpdate(id, req.body, { new:true })
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).json({status: "Error", data: { errMessage: "We are not able to process your request. Please try again after sometime" }});
  }
}

module.exports = { signUp, logIn, tokenAuth, fetchUserById, updateUserById };