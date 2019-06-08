const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');
const routes = require('./api/routes');

let db = require('./config/db');

const app = express();
const port = 8000;

app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: true }));

// allow client localhost to communicate with backend localhost
// allowed methods
app.use((req, res, next) => { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); 
  next(); 
});

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);

  db = database.db('workout-log');

  routes(app, db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});