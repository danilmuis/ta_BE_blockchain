'use strict'
var router = require('express').Router();
var controller = require('../app/controllers/certificateController');


router.post('/send',controller.send);
router.get('/contract',controller.contract);
router.post('/find',controller.find);
// router.get('/',controller.dashboard);
// router.get('/admin',controller.admin);
// router.get('/approval',controller.approval);
// router.get('/transkrip',controller.transkrip);
// router.get('/stakeholder', controller.pageChecker);

router.post('/setIjazah',controller.setIjazah);
router.post('/sertifikat',controller.generateSertifikat);
router.post('/transkrip',controller.generateTranskrip);
router.post('/stakeholder',controller.check);

module.exports = router;

