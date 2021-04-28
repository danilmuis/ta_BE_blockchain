'use strict'
var router = require('express').Router();
var user = require('../app/controllers/controller_user');

router.post('/login',user.login);
router.get('/logout',user.logout);
module.exports = router;

