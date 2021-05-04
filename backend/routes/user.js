"use strict";

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', [
    body('firstName', "Le prénom doit faire au moins 3 caractères")
        .notEmpty()
        .escape()
        .trim()
        .isLength({ min: 3 }),
    body('lastName', "Le nom doit faire au moins 3 caractères")
        .notEmpty()
        .escape()
        .trim()
        .isLength({ min: 3 }),
    body('email', "Adresse email invalide")
        .notEmpty()
        .escape()
        .trim().isEmail(),
    body('password', "Le mot de passe doit faire 6 caractères minimum, comprendre au moins une majuscule, deux chiffres et un caractère spécial.")
        .notEmpty()
        .trim()
        .isLength({ min: 6 }),
], userCtrl.signup);

router.post('/login', [
    body('email', "Adresse email invalide")
        .notEmpty()
        .escape()
        .trim().isEmail(),
        body('password', "Le mot de passe doit faire 6 caractères minimum, comprendre au moins une majuscule, deux chiffres et un caractère spécial.")
        .notEmpty()
        .trim()
        .isLength({ min: 6 }),
], userCtrl.login); 

router.get('/getuser/:id', auth, userCtrl.getUserById);

router.get('/findAll', auth, userCtrl.findAll);

router.get('/findOne', auth, userCtrl.findOne);


module.exports = router;