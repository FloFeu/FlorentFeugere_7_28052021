
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const conn = require('../config/db.config').promise();


let passwordPattern = new passwordValidator();
passwordPattern
    .is().min(6)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().symbols(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password1234', 'P@ssW0rd']);

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (passwordPattern.validate(req.body.password) == true) {
        try {
            const [row] = await conn.execute(
                "SELECT `email` FROM `users` WHERE `email`=?", [req.body.email]
            );

            if (row.length > 0) {
                return res.status(201).json({
                    message: "Cette adresse email est déja utilisée."
                });
            }
            const hashPass = await bcrypt.hash(req.body.password, 12);

            const [rows] = await conn.execute("INSERT INTO users (prenom, nom, email, password) VALUES (?,?,?,?)",
                [req.body.Prenom, req.body.Nom, req.body.email, hashPass]);

            if (rows.affectedRows === 1) {
                return res.status(201).json({
                    message: "L'inscription s'est correctement déroulée."
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

exports.login = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const [row] = await conn.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [req.body.email]
        );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Adresse email invalide."
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, row[0].password);
        if (!validPassword) {
            return res.status(422).json({
                message: "Mot de passe incorrect."
            });
        }

        const theToken = jwt.sign(
            { userId: row[0].userId },
            process.env.TOKEN,
            { expiresIn: '12h' }
        );

        return res.status(201).json({
            userId: row[0].userId,
            token: theToken
        });
    } catch (err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const [row] = await conn.execute(
            "SELECT `userId`, `prenom`, `nom`, `email` FROM `users` WHERE `userId`=?",
            [req.body.userId]
        );

        if (row.length > 0) {
            return res.status(201).json({
                user: row[0]
            });
        }

        res.status(401).json({
            message: "Utilisateur non trouvé"
        })
    } catch (err) {
        next(err);
    }
}