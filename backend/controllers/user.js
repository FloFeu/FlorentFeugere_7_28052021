"use strict";

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const User = require('../models/User');
const fs = require('fs');



let passwordPattern = new passwordValidator();
passwordPattern
    .is().min(8)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().symbols(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password1234', 'P@ssW0rd']);

exports.signup = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (passwordPattern.validate(req.body.password) == true) {
        bcrypt.hash(req.body.password, 12)
            .then(hash => {
                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                });

                user.add()
                    .then(() => res.status(200).json({ message: 'Utilisateur créé !' }))
                    .catch((error) => res.status(400).json({ error }))
            })
    } else {
        return res.status(401).json({ message: 'Mot de passe invalide' })
    }
};

exports.login = (req, res, next) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.findOneByMail()
        .then(([rows, fields]) => {
            if (rows.length === 0) {
                return res.status(401).json({ error: `Utilisateur non trouvé: ${req.body.email} !` })
            }
            bcrypt.compare(req.body.password, rows[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json(
                        {
                            firstName: rows[0].firstName,
                            userId: rows[0].userId,
                            token: jwt.sign(
                                {
                                    userId: rows[0].userId,
                                    isAdmin: rows[0].isAdmin
                                },
                                process.env.TOKEN,
                                { expiresIn: '12h' }
                            )
                        });
                })
                .catch(error => res.status(500).json({ message: error }))
        })
        .catch(error => res.status(500).json({ message: error }));
}

exports.findAll = (req, res, next) => {
    let user = new User();
    user.findAll()
        .then(([rows, fields]) => {
            res.status(200).json(rows)
        })
        .catch((err) => {
            res.status(400).json({ error })
        })
}

exports.findOneByName = (req, res, next) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    user.findByName()
        .then(([users, fields]) => {
            if (users.length === 0) {
                return res.status(401).json({ error: 'Aucun utilisateur n\'a été trouvé' })
            }
            res.status(200).json({ users })
        })
        .catch(err => res.status(400).json({ message: error }))
};

exports.findOneById = (req, res, next) => {
    let user = new User({
        userId: req.params.id
    });
    user.findOneById()
        .then(([user, fields]) => {
            if (user.length === 0) {
                return res.status(401).json({ error: 'Aucune utilisateur n\'a été trouvé !' })
            }
            res.status(200).json(user[0])
        })
        .catch(error => res.status(400).json({ error }));
};

exports.modifyOne = (req, res, next) => {
    const newFirstname = req.body.firstName.split(' ').join('_');
    let user = new User({
        userId: req.params.id,
        firstName: newFirstname,
        bio: req.body.bio,
        avatar: req.files[0] ? `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}` : req.body.currentAvatar
    });
    user.findOneById()
        .then(([users, fields]) => {
            if (users.length === 0) {
                return res.status(401).json({ error: 'Aucune utilisateur n\'a été trouvé !' })
            }
            let image = users[0].avatar;
            const filename = image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                user.modifyOne()
                    .then(() =>
                        res.status(200).json({ message: 'Les changements ont été appliqués.' }))
            })
        }).catch(error => res.status(400).json({ error }));
};

exports.deleteOne = (req, res, next) => {
    let user = new User({
        userId: req.params.id
    });

    user.findOneById()
        .then(([users, fields]) => {
            if (user.length === 0) {
                return res.status(401).json({ error: 'Aucune utilisateur n\'a été trouvé !' })
            }
            let image = users[0].avatar;
            const filename = image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                user.findFiles()
                    .then(([files, fields]) => {
                        files.forEach(file => {
                            let image = file.PostAttachment;
                            const filename = image.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {})
                        });
                        user.deleteOne()
                            .then(() => {
                                res.status(200).json({ message: 'Utilisateur correctement supprimé.' })
                            })

                    })
            });
        })
        .catch(error => res.status(400).json({ error }));

};