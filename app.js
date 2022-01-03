const express=require('express');
const app=express();
require('dotenv').config();
const mongoose  = require('mongoose');
console.log(process.env.DATABASE_URL)
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./config/keys');
//A3qSo6RKPtbGhgjq

const bodyParser = require('body-parser');
const expressRate = require('express-rate-limit');
const xss = require('xss-clean/lib');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const fileUpload = require('express-fileupload');



mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})


require('./models/user')
require('./models/post')

const apiLimiter = expressRate({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
const user = require('./routes/user');
const db = require('./db.js');
const port = process.env.PORT ||5000;
const origin = process.env.ORIGIN;

console.log('port is ===', port);
console.log('origin is ===', origin);


  

  
// Assign route
app.use('/', (req, res, next) => {
    const filters = req.query;
    const filteredUsers = data.filter(user => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  });

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com", "http://localhost:8000");
    return next();
});

app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
app.use(express.json({limit: '10kb'}));
app.use(xss());

app.use(mongoSanitize());

app.use(fileUpload({
    createParentPath: true,
    parseNested: true
}));  
process.env.root_dir = __dirname;

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
})
  

module.exports=app;