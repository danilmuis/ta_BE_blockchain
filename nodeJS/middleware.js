const admin = (req,res,next) => {
    if(req.session.user.role == 1){
        next();
    }else{
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
}

const staff = (req,res,next) => {
    if(req.session.user.role >= 3 && req.session.user.role <= 6){
        next();
    }else{
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
}

const creator = (req,res,next) => {
    if(req.session.user.role == 2){
        next();
    }else{
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
}

const authenticated = (req, res,next) => {

    if(!req.session.user){
        res.status(401);
        res.json({'message':'Unauthorized'});
    }else{
        next();
    }
}

module.exports = {
    admin,
    staff,
    creator,
    authenticated
};