'use strict'
var router = require('express').Router();
var controller = require('./controller');


// router.get('/dashboard',controller.index);
// router.post('/send',controller.send);
// router.get('/contract',controller.contract);
// router.post('/find',controller.find);
// router.post('/setIjazah',controller.setIjazah);
router.get('/getIjazah',controller.getIjazah);
// router.get('/',controller.dashboard);
// router.get('/admin',controller.admin);
// router.get('/approval',controller.approval);
// router.get('/transkrip',controller.transkrip);
// router.post('/sertifikat',controller.generateSertifikat);
// router.post('/transkrip',controller.generateTranskrip);
// router.get('/stakeholder', controller.pageChecker);
// router.post('/stakeholder',controller.check);
router.post('/signature',controller.signature);

// router.post('/login',user.login);

module.exports = router;

