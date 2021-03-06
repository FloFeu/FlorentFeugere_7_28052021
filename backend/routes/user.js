"use strict";

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const rateLimit = require('express-rate-limit')

//Limite de création de comptes fixée à 10 toutes les 2 minutes
const createAccountLimiter = rateLimit({
    windowsM: 2 * 60 * 1000,
    max: 10
})
//localhost:3000/api/auth/...

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
], createAccountLimiter, userCtrl.signup);

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

router.get('/users', auth, userCtrl.findAll);
router.post('/users', auth, userCtrl.findOneByName);
router.get('/users/:id', auth, userCtrl.findOneById);
router.put('/users/:id', auth, multer, userCtrl.modifyOne);
router.delete('/users/:id', auth, userCtrl.deleteOne);


module.exports = router;

