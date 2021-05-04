"use strict";

const Post = require('../models/Post');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res, next) => {
    if (!req.body.msg) {
        res.status(400).json({ message: 'Votre post est vide.' })
        res.end();
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.TOKEN);
            console.log(decodedToken);
            const reqUserId = decodedToken.userId;

            if (reqUserId) {
                const post = new Post({
                    msg: req.body.msg,
                    postAttachment: req.body.postAttachment,
                    userId: reqUserId
                });

                post.add()
                    .then(() => res.status(201).json({
                        message: 'Post publié !'
                    }))
                    .catch(error => res.status(400).json(error))
            }
        }
        catch (error) {
            res.status(400).json({ message: 'Requête non authentifiée !' })
        }
    }
};

exports.getOnePost = (req, res, next) => {
    console.log(req.params.id)
    const post = new Post({
        postId: req.params.id
    });
    console.log(post);
    post.getOne()
        .then( ([rows, fields ]) => {
            console.log(rows);
            res.status(201).json(rows[0])
        }).catch(err => {
            res.status(400).json({ error })
        });
};

exports.getAllPosts = (req, res, next) => {
    const post = new Post();
    post.getAll()
        .then( ([ rows, fields ]) => {
            res.status(201).json(rows)
        }).catch(err => {
            res.status(400).json({ err })
        });
};

exports.getPostsByUser = (req, res, next) => {
    const post = new Post({
        userId: req.params.id
    });

    post.getAllPostsFromUserId()
        .then( ([ rows, fields] ) => {
            res.status(201).json(rows)
        }).catch(err => {
            res.status(400).json({ err })
        })
};

exports.modifyPost = (req, res, next) =>{
    const post = new Post({
        postId: req.params.id,
        msg: req.body.msg,
        postAttachment: req.body.postAttachment
    });

    post.modifyOne()
        .then(() => res.status(200).json({ message: 'Votre post à bien été modifié.'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    const post = new Post({
        postId: req.params.id
    });

    post.deleteOne()
        .then(() => res.status(200).json({ message: 'Post correctement supprimé'}))
        .catch(error => res.status(400).json({ error }));
};