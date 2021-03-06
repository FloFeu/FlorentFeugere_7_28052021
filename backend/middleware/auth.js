"use strict";

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;

        // Vérification du status d'admin
        if ( isAdmin === 0 ) {
            if ( req.body.userId && req.body.userId !== userId ) {
                throw 'User Id non valable !'}
            else {
                next ();
            }    
        } else {
            next();
        }
    }catch(err) {
        res.status(401).json({ message: 'Requête non authentifiée !' })
    }
};