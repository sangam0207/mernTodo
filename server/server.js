// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require('dotenv')
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
