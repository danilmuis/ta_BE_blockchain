const bcrypt = require("bcrypt");
const jwt_auth = require('../middlewares/auth_mdm');

class UserController {
    async login(req, res) {
       
        const userFound = await database_users.getUser(req.body.email);
        var checkLogin = await bcrypt.compare(req.body.password, userFound[0].password);
        if(checkLogin){
            const token = jwt_auth.generateAccessToken({
                id:userFound[0].id,
                email: req.body.email,
            });
            // response.responseSuccess(res,{_token:token});
        }else{
            // response.responseFailedLogin(res);
        }
        
    }
}

module.exports = new UserController();