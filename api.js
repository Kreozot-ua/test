const express = require("express");
const fs = require('fs');
const port = process.env.PORT || 8080;

const app = express();
const jsonParser = express.json();

app.get("/api/books-list", jsonParser, function (request, response) {
  let result = fs.readFileSync('./books.json', 'utf8');

  try {
    result = JSON.parse(result);
  } catch(error) {
    response.json({success: false, error: error, data: {}});
  }

  response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  response.json({success: true, error: '', data: result});
});

app.get("/api/authors-list", jsonParser, function (request, response) {
  let result = fs.readFileSync('./authors.json', 'utf8');

  try {
    result = JSON.parse(result);
  } catch(error) {
    response.json({success: false, error: error, data: {}});
  }

  response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  response.json({success: true, error: '', data: result});
});

app.listen(port, () => {
  console.log(`API server runs on ${port} port`);
});