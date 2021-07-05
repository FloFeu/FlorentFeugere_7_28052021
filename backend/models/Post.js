"use strict";

const mysql = require('mysql2');
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
            if (post.userId) this.userId = post.userId;
        }
    };

    add() {
        const sql = `INSERT INTO posts (postId, msg, postAttachment, userId) VALUES (NULL, ${mysql.escape(this.msg)}, '${this.postAttachment}', '${this.userId}')`;
        console.log(sql);
        return executeSql(sql);
    };

    getAll() {
        const sql = `SELECT postId, msg, postDate, PostAttachment, posts.userId, users.userId, firstName, lastName, avatar, (SELECT COUNT(*) FROM comments WHERE comments.postId = posts.postId) as postComments, (SELECT COUNT(*) FROM likes WHERE likes.postId = posts.postId) as postLikes FROM posts JOIN users ON posts.userId = users.userId ORDER BY postDate DESC`;
        console.log(sql);
        return executeSql(sql);
    };

    hasLiked() {
        const sql = `SELECT likes.userId FROM likes WHERE likes.postId = '${this.postId}' AND likes.userId = '${this.userId}'`;
        console.log(sql);
        return executeSql(sql);
    };

    getOne() {
        const sql = `SELECT postId, msg, postDate, postAttachment, posts.userId, users.userId, firstName, lastName, avatar, (SELECT COUNT(*) FROM comments WHERE comments.postId = posts.postId) as postComments, (SELECT COUNT(*) FROM likes WHERE likes.postId = posts.postId) as postLikes FROM posts JOIN users ON posts.userId = users.userId WHERE postId='${this.postId}'`;
        console.log(sql);
        return executeSql(sql);
    };

    getAllPostsFromUserId() {
        const sql = `SELECT postId, msg, postDate, PostAttachment, posts.userId, users.userId, firstName, lastName, avatar, (SELECT COUNT(*) FROM comments WHERE comments.postId = posts.postId) as postComments, (SELECT COUNT(*) FROM likes WHERE likes.postId = posts.postId) as postLikes FROM posts JOIN users ON posts.userId = users.userId WHERE posts.userId='${this.userId}' ORDER BY postDate DESC`;
        console.log(sql);
        return executeSql(sql);
    };

    deleteOne() {
        const sql = `DELETE FROM posts WHERE postId='${this.postId}'`;
        console.log(sql);
        return executeSql(sql);
    };

    checkLike() {
        const sql = `SELECT likes.like, likes.userId FROM likes WHERE userId = '${this.userId}' AND postId = '${this.postId}'`;
        console.log(sql);
        return executeSql(sql);
    };

    like() {
        const sql = `INSERT INTO likes (userId, postId) VALUES ('${this.userId}', '${this.postId}')`;
        console.log(sql);
        return executeSql(sql);
    };

    dislike(likeId) {
        const sql = `DELETE FROM likes WHERE likes.like = '${likeId}'`;
        console.log(sql);
        return executeSql(sql);
    }
}