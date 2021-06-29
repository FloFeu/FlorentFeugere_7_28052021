"use strict";

const Post = require('../models/Post');
const fs = require('fs');
const jwt = require('jsonwebtoken');


exports.createPost = (req, res, next) => {
    if (!req.files[0] && req.body.msg == '') {
        return res.status(400).json({ message: "Votre post ne peut être vide." });

    } else {
        const post = new Post({
            msg: req.body.msg,
            userId: req.body.userId,
            postAttachment: req.files[0] ? `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}` : null
        });

        post.add()
            .then(() => res.status(201).json({
                message: 'Post publié !'
            }))
            .catch(error => res.status(400).json(error))
    }
};

exports.getOnePost = (req, res, next) => {
    const post = new Post({
        postId: req.params.id
    });
    post.getOne()
        .then(([rows, fields]) => {
            res.status(201).json(rows[0])
        }).catch(err => {
            res.status(400).json({ error })
        });
};

exports.getAllPosts = (req, res, next) => {
    const post = new Post();
    post.getAll()
        .then(([rows, fields]) => {
            res.status(201).json(rows);
        }).catch(err => {
            res.status(400).json({ err })
        });
};

exports.getPostsByUser = (req, res, next) => {
    const post = new Post({
        userId: req.params.id
    });

    post.getAllPostsFromUserId()
        .then(([rows, fields]) => {
            res.status(201).json(rows)
        }).catch(err => {
            res.status(400).json({ err })
        })
};

exports.modifyPost = (req, res, next) => {
    const post = new Post({
        postId: req.params.id,
        msg: req.body.msg,
        postAttachment: req.body.postAttachment
    });

    post.modifyOne()
        .then(() => res.status(200).json({ message: 'Votre post à bien été modifié.' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    const post = new Post({
        postId: req.params.id
    });
    post.getOne()
        .then(([rows, fields]) => {
            let image = rows[0].postAttachment
            const filename = image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.deleteOne()
                    .then(() =>
                        res.status(200).json({ message: 'Post correctement supprimé' }))
            })
        }).catch(error => {
            res.status(400).json({ error })
        });
};

exports.likePost = (req, res, next) => {

    const post = new Post({
        postId: req.params.id,
        userId: req.body.userId
    });

    post.checkLike()
        .then(([row, fields]) => {
            if (row.length) {
                post.dislike(row[0].like)
                    .then(() => {
                        res.status(200).json({ message: "Post unliké !" })
                    })
            } else {
                post.like()
                    .then(() => {
                        res.status(200).json({ message: "Post liké !" })
                    })
            }
        })
        .catch((error) => {
            res.status(400).json({ error: 'error' })
        })
};

exports.whoLiked = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;

        const post = new Post({
            postId: req.params.id,
            userId: userId
        });

        post.hasLiked()
            .then(([row, fields]) => {
                if (row.length) {
                    res.status(201).json(true)
                } else {
                    res.status(201).json(false)
                }
            })
            .catch((error) => {
                res.status(400).json({ error })
            })

    } catch (error) {
        res.status(400).json({ error })
    }
};