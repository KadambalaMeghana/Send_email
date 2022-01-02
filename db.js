const mongoose = require('mongoose');

const dbname = process.env.DB_NAME;

console.log('db==', dbname);

const constr = `mongodb://localhost:27017/${dbname}`;


mongoose.connect(constr, {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Databse is connected.`);
});