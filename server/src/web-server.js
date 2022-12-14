const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const model = require('./model');

const port = 3001;

exports.createWebServer = function () {
  let app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors({
    origin: [/localhost:/],
  }))

  app.get('/', function (req, res) {
    res.send('server is working');
  });

  app.get('/api/random', async (req, res) => {
    const rs = await model.selectItem(1);
    res.send({rs});
  })

  app.use(function (req, res) {res.sendStatus(404);});

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    next();
  });

  const server = http.createServer(app);

  server.listen(port, function() {
    console.info("listening on port %s!!!", port);
  });
}
