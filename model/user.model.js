const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    email_verified: Boolean,
    created_date: { type: Date, default: Date.now()}
})

module.exports = mongoose.model("User",userSchema);
