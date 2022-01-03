const express = require('express');
const mongoose = require('mongoose');
const User = require("./Schema/userSchema");
const routesUrl = require('./routes/route')

mongoose.connect("mongodb://localhost/userdb");

const app = express();
const port = 3000

run()
async function run(){
    const user = new User({username: "Meghana", email: "Kadambalameghana1502@gmail.com"})
    await user.save();
    console.log(user);
}
app.use(express.json());
app.use('/user',routesUrl);

app.get('*',(req,res) => {
    res.send("Hi there...This is Kadambala Meghana.");
    res.send("wrong url");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
}) 