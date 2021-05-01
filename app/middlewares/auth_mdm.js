const jwt = require('jsonwebtoken');
require('dotenv').config({path: __dirname + '/../../.env'});

class Auth{

    async verifyToken(req,res,next) {
        const bearer_header = req.headers['authorization'];

        if(typeof bearer_header !== 'undefined'){

            const split = bearer_header.split(' ');
            const bearer_token = split[1];

            await jwt.verify(bearer_token, process.env.JWT_SECRET, function(err,decoded) {
                if (err) {
                    res.status(403).json({"message" : "Invalid token"});
                }else{
                    req.user = decoded;
                    next()
                }
            })
        }else{
            res.status(403).json({"message" : "Forbidden"});
        }
    }

    adminCheck(req,res,next){
        // User Checking
        if (req.user.role === "admin" || req.user.role === "superadmin") {
            next();
        }else{
            res.status(401).json({"message" : "Only SuperAdmin and Admin Can Access"});
        }
    }

    participantCheck(req,res,next){
        // User Checking
        if (req.user.role === "participant") {
            next();
        }else{
            res.status(401).json({"message" : "Only Participant Can Access"});
        }
    }

    allAdminCheck(req,res,next){
        if (req.user.role === "admin" || req.user.role === "superadmin" || req.user.role === "frontoffice") {
            next();
        }else{
            res.status(401).json({"message" : "Only SuperAdmin, Admin and Front Office Can Access"});
        }
    }
}

module.exports = new Auth();