"use strict";

const conn = require('../config/db.config').promise();
const executeSql = require('../services/db');

module.exports = class User {
    userId = null;
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    bio = '';
    isAdmin = 0;

    constructor(user = null) {
        if (user != null) {
            if (user.firstName) this.firstName = user.firstName;
            if (user.lastName) this.lastName = user.lastName;
            if (user.email) this.email = user.email;
            if (user.password) this.password = user.password;
            if (user.bio) this.bio = user.bio;
            if (user.isAdmin) this.isAdmin = user.isAdmin;
        }
    };

    add() {
        const sql = `INSERT INTO users (userId, firstName, lastName, email, password, bio, isAdmin) VALUES(NULL, "${this.firstName}", "${this.lastName}", "${this.email}", "${this.password}", "${this.bio}","${this.isAdmin}")`;
        console.log(sql);
        return executeSql(sql);
    };

    findAll() {
        const sql = ` SELECT * FROM users`;
        return executeSql(sql)
    };

    findOneByMail() {
        const sql = `SELECT * FROM users WHERE email='${this.email}';`
        console.log(sql);
        return executeSql(sql);
    };

    findByName() {
        const sql = `SELECT userId, firstName, lastName FROM users where firstName='${this.firstName}' OR lastName='${this.lastName}'`;
        console.log(sql);
        return executeSql(sql);
    }
};


