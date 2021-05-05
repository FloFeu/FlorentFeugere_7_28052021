"use strict";

const executeSql = require('../services/db');

module.exports = class Post {
    postId = null;
    msg = '';
    postDate = null;
    postAttachment = '';
    userId = '';

    constructor(post = null) {
        if (post != null) {
            if (post.postId) this.postId = post.postId;
            if (post.msg) this.msg = post.msg;
            if (post.postAttachment) this.postAttachment = post.postAttachment;
            if (post.userId) this.userId = post.userId
        }
    };

    add() {
        const sql = `INSERT INTO posts (postId, msg, postAttachment, userId) VALUES (NULL, "${this.msg}", "${this.postAttachment}", "${this.userId}")`;
        console.log(sql);
        return executeSql(sql);
    };

    getAll() {  
        const sql = `SELECT * FROM posts`;
        console.log(sql);
        return executeSql(sql);
    };

    getOne() {
        const sql = `SELECT * FROM posts WHERE postId=${this.postId}`;
        console.log(sql);
        return executeSql(sql);
    };

    getAllPostsFromUserId() {
        const sql = `SELECT * FROM posts WHERE userId=${this.userId}`;
        console.log(sql);
        return executeSql(sql);
    };

    modifyOne() {
        const sql = `UPDATE posts SET msg="${this.msg}", postAttachment="${this.postAttachment}" WHERE postId=${this.postId}`;
        console.log(sql);
        return executeSql(sql); 
    };

    deleteOne() {
        const sql = `DELETE FROM posts WHERE postId=${this.postId}`;
        console.log(sql);
        return executeSql(sql);
    }
}