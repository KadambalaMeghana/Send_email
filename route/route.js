const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../Schema/userSchema');

router.post('/signup',(req,res) => {
    bcrypt.hash(req.body.password,10, function(err, hash) {
        if(err){
            return res.status(401).send({
                error: err
            })
        }
        else{
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                email_verified: req.body.email_verified
            })
            user.save()
            .then(result => {
                res.status(200).send({
                    new_user: result
                })
            })
            .catch(err => {
                res.status(500).send({
                    error: err
                })
            })
        }
    });
})
router.post('/login',(req,res) => {
        User.find({username: req.body.username})                
        .exec((err,user) => {
            if(err){
                return res.status(401).send({
                    error: err
                })
            }

            if(user.length < 1){
                return res.status(401).send({
                    msg: "user not found"
                })
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result) => {
                if(err){
                    res.status(401).send({
                        msg: "incorrect password"
                    })
                }
                else{
                    const token = jwt.sign({
                        username: user[0].username,
                        email:user[0].email
                    },
                    "secret key",
                    {noTimestamp:true}
                    
                    )
                    return res.status(200).send({
                        token: token,
                        username: user[0].username
                    })
                }
            })
        })
        
    
})

module.exports = router;