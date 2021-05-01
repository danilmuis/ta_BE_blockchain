'use strict'
var router = require('express').Router();
var controller = require('../app/controllers/CertificateController');

router.get('/getIjazah',controller.getIjazah);
router.get('/',controller.index);


module.exports = router;