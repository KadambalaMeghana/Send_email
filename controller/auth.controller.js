const jwt = require('jsonwebtoken');

const private_key = process.env.PRIVATE_KEY;

console.log('private key ==', private_key);
const loginModel = require('../model/login.model');

let responseObj = {
    "status": "",
    "msg": "",
    "body": {

    }
}






class Auth {

    login = (req,res,next) => {
        try{
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "Error occured/input is missing.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }else{
                loginModel.find({name:req.body.name, password: req.body.password}, (err, docs) => {
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "Error occured.",
                            "body": err
                        }
                        res.status(500).send(responseObj);
                    }else{
                        if(docs !== null && docs.length > 0) {
                            const obj = {
                                name: req.body.name,
                                type: "login"
                            }
                            const token = jwt.sign(obj, private_key, {expiresIn: '1h'});
                            if(token !== '' && token !== null) {
                                responseObj = {
                                    "status": "success",
                                    "msg": "Token generated.",
                                    "body": {
                                        "access_token": token
                                    }
                                }
                                res.status(200).send(responseObj);
                            }else{
                                responseObj = {
                                    "status": "error",
                                    "msg": "Token could not generated.",
                                    "body": {}
                                }
                                res.cookies('jwt', token, {httpOnly: true});
                                res.status(500).send(responseObj);
                            }
                        }else{
                            responseObj = {
                                "status": "error",
                                "msg": "Error occured.",
                                "body": {}
                            }
                            res.status(500).send(responseObj);
                        }
                    }
                })
            }
        }catch(error) {
            console.log('Error', error);
        }
    }

    verify = (req, res, next) => {
        try{
            console.log('req', req.headers);
            if(req.headers && req.headers['authorization']){
                const access_token = req.headers['authorization'];
                const org_token = access_token.split(' ')[1];
                console.log('token', org_token);
                jwt.verify(org_token, private_key, (err, docs) => {
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "Error occured.",
                            "body": err
                        }
                        res.status(500).send(responseObj);
                    }else{
                        next();
                    }
                })
            }else{
                responseObj = {
                    "status": "error",
                    "msg": "Token not found.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }
        }catch(error) {
            console.log('Error', error);
        }
    }


}

module.exports = new Auth();