const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');
const logincontroller = require('../controller/auth.controller');





class Userrouter {
    
    getRouter() {
        try{
            router.get('/', controller.checkApi.bind(controller));
            router.post('/login', logincontroller.login.bind(logincontroller));
            router.get('/getRecord', logincontroller.verify, controller.getRecord.bind(controller));
            router.post('/addRecord', logincontroller.verify, controller.addRecord.bind(controller));
            router.post('/upload', logincontroller.verify, controller.upload.bind(controller));
            router.put('/updateRecord/:id', logincontroller.verify, controller.updateRecord.bind(controller));
            router.post('/searchRecord', logincontroller.verify, controller.searchRecord.bind(controller));
            router.post('/pagiRecord', logincontroller.verify, controller.pagiRecord.bind(controller));
            router.get('/sortRecord', logincontroller.verify, controller.sortRecord.bind(controller));
        }catch(error) {
            console.log('Error::', error);
        }

        return router;
    }
}

module.exports = new Userrouter();