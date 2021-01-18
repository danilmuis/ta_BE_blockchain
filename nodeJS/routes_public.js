'use strict'
var router = require('express').Router();
var user = require('./controller_user');

router.post('/login',user.login);
router.get('/logout',user.logout);
module.exports = router;

