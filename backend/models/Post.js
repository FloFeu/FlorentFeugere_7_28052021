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
        const sql = `SELECT postId, msg, postDate, PostAttachment, posts.userId, users.userId, firstName, lastName, avatar FROM posts JOIN users ON posts.userId = users.userId ORDER BY postDate DESC`;
        console.log(sql);
        return executeSql(sql);
    };

    getOne() {
        const sql = `SELECT postId, msg, postDate, postAttachment, posts.userId, users.userId, firstName, lastName, avatar FROM posts JOIN users ON posts.userId = users.userId WHERE postId=${this.postId}`;
        console.log(sql);
        return executeSql(sql);
    };

    getAllPostsFromUserId() {
        const sql = `SELECT postId, msg, postDate, PostAttachment, posts.userId, users.userId, firstName, lastName, avatar FROM posts JOIN users ON posts.userId = users.userId WHERE posts.userId=${this.userId} ORDER BY postDate DESC`;
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