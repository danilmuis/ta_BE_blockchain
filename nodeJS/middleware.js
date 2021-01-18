const admin = (req,res,next) => {
    console.log('admin');
    if(!req.session.user){
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
    else if(req.session.user.role == 1){
        next();
    }else{
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
}

const staff = (req,res,next) => {
    console.log('staff');
    if(!req.session.user){
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
    else if(req.session.user.role == 3 || req.session.user.role == 4 || req.session.user.role == 5 || req.session.user.role == 6){
        next();
    }else{
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
}

const creator = (req,res,next) => {
    console.log('creator');
    if(!req.session.user){
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
    else if(req.session.user.role == 2){
        next();
    }else{
        res.status(401);
        res.json({'message':'Unauthorized'});
    }
}

module.exports = {
    admin,
    staff,
    creator
};