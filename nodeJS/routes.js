'use strict'
var router =require('express').Router();
var controller = require('./controller')
router.get('/',controller.index);
router.post('/send',controller.send);
router.get('/contract',controller.contract);
router.post('/find',controller.find);
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