const WebServer = require('./web-server');
const model = require('./model');

async function start () {
  await model.init();
  WebServer.createWebServer();
}

start();
