const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LoginSchema = new Schema({
    name: { type: String, default: ''},
    password: { type: String, default: ''}
})

const Login = mongoose.model('login', LoginSchema);

module.exports = Login;