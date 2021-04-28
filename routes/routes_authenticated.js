'use strict'
var router = require('express').Router();
var controller = require('../app/controllers/certificateController');
router.get('/getIjazah',controller.getIjazah);

module.exports = router;