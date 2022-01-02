const path = require('path');
const UserModel = require('../model/user.model');
const moment = require('moment');

let responseObj = {
    "status": "",
    "msg": "",
    "body": {

    }
}








class Usercontroller {

    checkApi = (req, res, next) => {
        try{
            responseObj = {
                "status": "success",
                "msg": "Node REST API is working.",
                "body": {}
            }
            res.status(200).send(responseObj);
        }catch(error) {
            console.log('Error', error);
        }
    }

    getRecord = (req, res, next) => {
        try{
            UserModel.find({}, (err, docs) => {
                if(err) {
                    responseObj = {
                        "status": "error",
                        "msg": "Error occured.",
                        "body": err
                    }
                    res.status(500).send(responseObj);
                }else{
                    responseObj = {
                        "status": "success",
                        "msg": "Fetch the record",
                        "body": docs
                    }
                    res.status(200).send(responseObj);
                }
            })
        }catch(error) {
            console.log('Error', error);
        }
    }


    sortRecord = (req, res, next) => {
        try{
            UserModel.find({}).sort({created_date: -1}).exec((err, docs) => {
                if(err) {
                    responseObj = {
                        "status": "error",
                        "msg": "Error occured.",
                        "body": err
                    }
                    res.status(500).send(responseObj);
                }else{
                    responseObj = {
                        "status": "success",
                        "msg": "Fetch the record",
                        "body": docs
                    }
                    res.status(200).send(responseObj);
                }
            })
        }catch(error) {
            console.log('Error', error);
        }
    }

    addRecord = (req, res, next) => {
        try{
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "Input not found.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }else{
                const userRecord = new UserModel(req.body);
                userRecord.save((err, docs) => {
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "Error occured while adding.",
                            "body": err
                        }
                        res.status(500).send(responseObj);
                    }else{
                        responseObj = {
                            "status": "success",
                            "msg": "Successfully added",
                            "body": docs
                        }
                        res.status(200).send(responseObj);
                    }
                    
                })
            }
        }catch(error) {
            console.log('Error', error);
        }
    }

    upload = (req, res, next) => {
        try{
            if(!req.files) {
                responseObj = {
                    "status": "error",
                    "msg": "Input not found.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }else{
                const rawFile = req.files.file;
                console.log('file', rawFile);
                const timestamp = moment().format('YYYY-MM-DD HH:MM:ss');
                const newFileName = `${timestamp}_${rawFile.name}`;
                console.log('newfile', newFileName);
                rawFile.mv(`${process.env.root_dir}/uploads/${newFileName}`);
                responseObj = {
                    "status": "success",
                    "msg": "Successfully uploaded",
                    "body": {}
                }
                res.status(200).send(responseObj);
            }
        }catch(error) {
            console.log('Error', error);
        }
    }

    updateRecord = (req, res, next) => {
        try{
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "Input not found.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }else if(!req.params.id){
                responseObj = {
                    "status": "error",
                    "msg": "Send ID to update the record.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }else{

                UserModel.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "Error occured while updating.",
                            "body": err
                        }
                        res.status(500).send(responseObj);
                    }else{
                        responseObj = {
                            "status": "success",
                            "msg": "Successfully updated",
                            "body": docs
                        }
                        res.status(200).send(responseObj);
                    }
                })
            }
        }catch(error) {
            console.log('Error', error);
        }
    }


    searchRecord = (req, res, next) => {
        try{
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "Input is missing.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }else{
                //exact match

                UserModel.find({name:{$regex:`^${req.body.search.text.trim()}`, $options: 'i'}}, (err, docs) => {
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "Input is missing.",
                            "body": {}
                        }
                        res.status(500).send(responseObj);
                    }else{
                        responseObj = {
                            "status": "success",
                            "msg": "Record found.",
                            "body": docs
                        }
                        res.status(200).send(responseObj);
                    }
                })
            }
        }catch(error) {
            console.log('Error::', error);
        }
    }

    pagiRecord = (req, res, next) => {
        try{
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "Input is missing.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }else{
                //pagination
                // page number
                // no of records

                const currentPage = req.body.currentPage;//2
                const pageSize = req.body.pageSize; //10

                const skip = pageSize * (currentPage-1);
                const limit = pageSize;

                UserModel.find({}).skip(skip).limit(limit).exec((err, docs) =>{
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "Input is missing.",
                            "body": {}
                        }
                        res.status(500).send(responseObj);
                    }else{
                        responseObj = {
                            "status": "success",
                            "msg": "Record found.",
                            "body": docs
                        }
                        res.status(200).send(responseObj);
                    }
                })
            }
        }catch(error) {
            console.log('Error::', error);
        }
    }

}


module.exports = new Usercontroller();