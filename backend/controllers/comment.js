"user strict";

const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
    if (!req.body.commentMsg) {
        res.status(400).json({ message: 'Votre commentaire est vide. ' });
        res.end();
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.TOKEN);
            const reqUserId = decodedToken.userId;

            if (reqUserId) {
                const comment = new Comment({
                    postId: req.body.postId,
                    commentMsg: req.body.commentMsg,
                    userId: reqUserId
                });

                comment.add()
                    .then(() => {
                        res.status(200).json({ message: 'Commentaire ajouté :' })
                    })
                    .catch((error) => res.status(401).json({ error }))
            }
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
};

exports.getComments = (req, res, next) => {
    const comment = new Comment({
        postId: req.params.id
    });

    comment.getAll()
        .then(([comments, fields]) => {
            res.status(201).json(comments)
        }).catch(err => {
            res.status(400).json({ err })
        });
};

exports.deleteComment = (req, res, next) => {
    const comment = new Comment({
        commentId: req.params.id
    })

    comment.findOne()
        .then(([rows, fields]) => {
            if (rows.length === 0) {
                return res.status(401).json({ error: 'Commentaire introuvable !' })
            }
            comment.deleteOne()
                .then(() => res.status(200).json({ message: 'Commentaire correctement supprimé.' }))
                .catch(err => res.status(400).json({ error }));
        })
}
