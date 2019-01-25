var express = require('express')
var app = express()
var { execSync } = require('child_process')
var bodyParser = require('body-parser')
var path = require('path')

var assets = require('./assets');

// Use relative /assets folder to allow .jar files to be accessed.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use("/assets", assets);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// Git deploy functionality



// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
