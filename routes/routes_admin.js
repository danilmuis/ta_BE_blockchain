'use strict'
var router = require('express').Router();
var user = require('../app/controllers/controller_user');
router.post('/register',user.regisStaff);
// router.post('/regisSuperAdmin',user.regisSuperAdmin);
module.exports = router;