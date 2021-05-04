"use strict"; 

module.exports = (req, res, next) => {
    try {
        // Vérifier si isAdmin pour currentUser = 1 pour 
        // autoriser la requête
    }catch(err) {
        res.status(401).json({
            message: "Vous ne disposez pas des droits nécessaires pour effectuer cette requête !"
        })
    }
};