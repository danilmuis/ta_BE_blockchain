'use strict'
var router = require('express').Router();
var controller = require('./controller');
router.get('/getIjazah',controller.getIjazah);

module.exports = router;