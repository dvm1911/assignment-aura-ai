const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;
const connectDB = require('./config/dbconfig');
const {signUp, logIn, tokenAuth, fetchUserById, updateUserById} = require('./controllers/users.controller');
const jwt = require('jsonwebtoken');
const app = express();
const { authenticateToken } = require("./Util/authMiddleware")

app.use(express.json());
app.use(cors());

connectDB();

mongoose.connection.once('open', () => {
  console.log("Connection established with database");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

//Sign Up
app.post('/api/auth/signup', signUp);

//Log In
app.post('/api/auth/login', logIn);

//get User
app.get('/api/auth/getUser', authenticateToken, tokenAuth)

//fetchUserbyId
app.get('/api/auth/user/:id', fetchUserById)

//updateUser
app.put('/api/auth/user/update/:id', updateUserById);