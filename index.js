const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  })
  .use('/', require('./routes'))


  const db = require('./models');
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'RecreantsHonor'
    })
    .then(() => {
      app.listen(port, () => {
        console.log(`DB Connected and server running on ${port}.`);
      });
    })
    .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
    });