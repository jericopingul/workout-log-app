const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');
const routes = require('./api/routes');

let db = require('./config/db');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
 

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);

  db = database.db('workout-log');
  routes(app, db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
  
});