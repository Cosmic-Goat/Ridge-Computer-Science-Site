var express = require('express')
var app = express()
var { execSync } = require('child_process')
var bodyParser = require('body-parser')
var path = require('path')

const assets = require('./assets');
const path = require('path')
const bodyParser = require('body-parser')
const { execSync } = require('child_process')
const app = express()
const express = require('express')
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
app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'readme.md'))
})

app.post('/deploy', (request, response) => {
  if (request.query.secret !== process.env.SECRET) {
    response.status(401).send()
    return
  }

  if (request.body.ref !== 'refs/heads/glitch') {
    response
      .status(200)
      .send('Push was not to glitch branch, so did not deploy.')
    return
  }

  const repoUrl = request.body.repository.git_url

  console.log('Fetching latest changes.')
  const output = execSync(
    `git checkout -- ./ && git pull -X theirs ${repoUrl} glitch && refresh`
  ).toString()
  console.log(output)
  response.status(200).send()
})


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
