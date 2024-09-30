const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;
const connectDB = require('./config/dbconfig');
const {signUp, logIn, tokenAuth, fetchUserById, updateUserById} = require('./controllers/users.controller');
const jwt = require('jsonwebtoken');
const app = express();
const { addCoin, fetchCoin, fetchCoinById, updateCoinById, deleteCoin } = require('./controllers/coins.controller');
const { authenticateToken } = require("./Util/authMiddleware")

app.use(express.json());
app.use(cors());