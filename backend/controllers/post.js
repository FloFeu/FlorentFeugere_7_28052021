"use strict";

const Post = require('../models/Post');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res, next) => {
    console.log(req)
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
    console.log(req.params.id)
    const post = new Post({
        postId: req.params.id
    });
    console.log(post);
    post.getOne()
        .then(([rows, fields]) => {
            console.log(rows);
            res.status(201).json(rows[0])
        }).catch(err => {
            res.status(400).json({ error })
        });
};

exports.getAllPosts = (req, res, next) => {
    const post = new Post();
    post.getAll()
        .then(([rows, fields]) => {
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

    post.deleteOne()
        .then(() => res.status(200).json({ message: 'Post correctement supprimé' }))
        .catch(error => res.status(400).json({ error }));
};