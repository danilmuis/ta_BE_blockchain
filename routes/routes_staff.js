'use strict'
var router = require('express').Router();
var controller = require('../app/controllers/certificateController');

router.post('/signature',controller.signature);

module.exports = router;

