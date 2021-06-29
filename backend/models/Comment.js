"use strict";

const executeSql = require('../services/db');

module.exports = class Comment {
    commentId = null;
    postId = '';
    commentMsg = '';
    commentDate = null;
    userId = '';

    constructor(comment = null) {
        if (comment != null) {
            if (comment.commentId) this.commentId = comment.commentId;
            if (comment.postId) this.postId = comment.postId;
            if (comment.commentMsg) this.commentMsg = comment.commentMsg;
            if (comment.userId) this.userId = comment.userId
        }
    };

    add() {
        const sql = `INSERT INTO comments (commentId, postId, comment, userId) VALUES (NULL, "${this.postId}", "${this.commentMsg}", "${this.userId}")`;
        console.log(sql);
        return executeSql(sql);
    };

    getAll() {
        const sql = `SELECT commentId, postId, commentDate, comment, comments.userId, users.userId, firstName, lastName, avatar FROM comments JOIN users ON comments.userId = users.userId WHERE postId="${this.postId}" ORDER BY commentDate ASC`;
        console.log(sql);
        return executeSql(sql);
    };

    findOne() {
        const sql = `SELECT * FROM comments WHERE commentId="${this.commentId}"`;
        console.log(sql);
        return executeSql(sql);
    }

    modifyOne() {
        const sql = `UPDATE comments SET comment="${this.commentMsg}" WHERE commentId="${this.commentId}"`;
        console.log(sql);
        return executeSql(sql);
    };

    deleteOne() {
        const sql = `DELETE FROM comments WHERE commentId="${this.commentId}"`;
        console.log(sql);
        return executeSql(sql);
    }
}