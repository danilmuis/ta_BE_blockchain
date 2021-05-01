'use strict'
var router = require('express').Router();
var controller = require('../app/controllers/CertificateController');

router.post('/signature',controller.signature);

module.exports = router;

