const users = require('../models/users.model.js');
const jwt = require('jsonwebtoken');

const tokenSecretKey = "dd2fe518-149d-4e1e-823a-673335131ce5";

//Sign Up
const signUp = async (req, res) => {
  try{
    const { userName,  userEmail, userPassword, userPfp } = req.body;
    const user = new users({
      userName,
      userEmail,
      userPassword,
      userPfp
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