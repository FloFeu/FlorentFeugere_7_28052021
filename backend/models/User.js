"use strict";
const mysql = require('mysql2')
const executeSql = require('../services/db');

module.exports = class User {
    userId = null;
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    bio = '';
    isAdmin = 0;
    avatar = '';

    constructor(user = null) {
        if (user != null) {
            if (user.userId) this.userId = user.userId;
            if (user.firstName) this.firstName = user.firstName;
            if (user.lastName) this.lastName = user.lastName;
            if (user.email) this.email = user.email;
            if (user.password) this.password = user.password;
            if (user.bio) this.bio = user.bio;
            if (user.isAdmin) this.isAdmin = user.isAdmin;
            if (user.avatar) this.avatar = user.avatar;
        }
    };

    add() {
        const sql = `INSERT INTO users (userId, firstName, lastName, email, password, bio, isAdmin, avatar) VALUES(NULL, '${this.firstName}', '${this.lastName}', ${mysql.escape(this.email)}, ${mysql.escape(this.password)}, '${this.bio}','${this.isAdmin}' ,'${this.avatar}')`;
        console.log(sql);
        return executeSql(sql);
    };

    findAll() {
        const sql = ` SELECT * FROM users`;
        return executeSql(sql)
    };

    findOneByMail() {
        const sql = `SELECT * FROM users WHERE email=${mysql.escape(this.email)}`;
        console.log(sql);
        return executeSql(sql);
    };

    findOneById() {
        const sql = `SELECT users.userId, firstName, lastName, email, bio, avatar, isAdmin FROM users WHERE users.userId='${this.userId}'`;
        console.log(sql);
        return executeSql(sql);
    }

    findByName() {
        const sql = `SELECT userId, firstName, lastName FROM users where firstName='${this.firstName}' OR lastName='${this.lastName}'`;
        console.log(sql);
        return executeSql(sql);
    };

    modifyOne() {
        const sql = `UPDATE users SET firstName=${mysql.escape(this.firstName)}, bio=${mysql.escape(this.bio)}, avatar='${this.avatar}' WHERE userId='${this.userId}'`;
        console.log(sql);
        return executeSql(sql);
    };

    findFiles() {
        const sql = `SELECT PostAttachment, users.userId FROM posts JOIN users ON posts.userId = users.userId WHERE users.userId='${this.userId}'`;
        console.log(sql);
        return executeSql(sql);
    }

    deleteOne() {
        const sql = `DELETE FROM users WHERE userId='${this.userId}'`;
        console.log(sql);
        return executeSql(sql);
    }

};


