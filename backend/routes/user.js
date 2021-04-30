"use strict";

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup',[
    body('Prenom', "Le prénom doit faire au moins 3 caractères")
        .notEmpty()
        .escape()
        .trim()
        .isLength({ min: 3 }),
    body('Nom', "Le nom doit faire au moins 3 caractères")
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
],userCtrl.signup);

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

router.get('/getuser/', auth, userCtrl.getUser);

module.exports = router;