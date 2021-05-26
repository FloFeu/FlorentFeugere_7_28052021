"user strict";
require('dotenv').config()

const express = require('express');
const mysql = require('mysql2');
const helmet = require('helmet');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const app = express();
const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// app.use((err, req, res, next) => {
//     // console.log(err);
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";
//     res.status(err.statusCode).json({
//       message: err.message,
//     });
// });

module.exports = app;