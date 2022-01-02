const express=require('express');
const app=express();
const data = require('./data');
const bodyParser = require('body-parser');
const expressRate = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const fileUpload = require('express-fileupload');
require('dotenv').config();


const apiLimiter = expressRate({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
const user = require('./route/user.route');
const db = require('./db.js');
const app = express();
const port = process.env.PORT;
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

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com", "http://localhost:8000");
    return next();
});

app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
app.use(express.json({limit: '10kb'}));
app.use(xss());

app.use(mongoSanitize());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.use(fileUpload({
    createParentPath: true,
    parseNested: true
}));  
process.env.root_dir = __dirname;

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200, 
    methods: "GET, POST, PUT, DELETE"
}

app.use(cors(corsOptions));


app.use('/user', apiLimiter, user.getRouter());


app.get('/cors', (req, res, next) => {
    res.status(200).send({'msg': "CORS enable for get request"});
})

app.post('/cors/add', (req, res, next) => {
    res.status(200).send({'msg': "CORS enable for post request"});
})

app.put('/cors/update', (req, res, next) => {
    res.status(200).send({'msg': "CORS enable for update/put request"});
})

app.delete('/cors/delete', (req, res, next) => {
    res.status(200).send({'msg': "CORS enable for delete request"});
})




app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
})
  

module.exports=app;