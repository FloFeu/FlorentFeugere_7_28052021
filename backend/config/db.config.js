"use strict";

const mysql = require('mysql2');

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const db_connection = mysql
    .createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Dp87@4kan-24mysql',
        database: 'groupomania'
    })
    .on('error', (err) => {
        console.log("Connexion à la base de donnée échouée - ", err);
    });

module.exports = db_connection;