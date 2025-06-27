const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Route imports
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const ConnectMongo = require('./config/db');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

ConnectMongo();

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);