'use strict'
var router =require('express').Router();
var controller = require('./controller');

router.get('/dashboard',controller.index);
router.post('/send',controller.send);
router.get('/contract',controller.contract);
router.post('/find',controller.find);
router.post('/setIjazah',controller.setIjazah);
router.get('/getIjazah',controller.getIjazah);
router.get('/',controller.dashboard);
router.get('/admin',controller.admin);
router.get('/approval',controller.approval);
router.get('/transkrip',controller.transkrip);
router.post('/sertifikat',controller.generateSertifikat);
router.post('/transkrip',controller.generateTranskrip);
router.post('/buatHTML',controller.buatHTML);
router.get('/stakeholder', controller.pageChecker);
router.post('/upload',controller.upload);
//router.post('/check',upload.any(),controller.check);
router.post('/stakeholder',controller.check);
//router.get('/mdm',controller.user);
module.exports = router;
// module.exports = function(app){
//     var controller = require('./controller')

//     app.route('/').get(controller.index)
//     app.route('/send').post(controller.send)
//     app.route('/contract').get(controller.contract)

//     app.route('/users').get(controller.users)
//     app.route('/users/:id').get(controller.findUsers)
//     app.route('/users').post(controller.createUsers)
//     app.route('/users/:id').put(controller.updateUsers)
//     app.route('/users').delete(controller.deleteUsers)
    
// }