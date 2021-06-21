'use strict'
var router = require('express').Router();
var controller = require('../app/controllers/certificateController');

router.get('/getIjazah',controller.getIjazah);
router.get('/',controller.index);


module.exports = router;