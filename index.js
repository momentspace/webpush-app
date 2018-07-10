const express = require('express')
const app = express()
const webpush = require('web-push');
const vapidKeys = require('./keys.json')
const bodyParser = require('body-parser');

var fs = require('fs')
var https = require('https')
var options = {
  pfx: fs.readFileSync('./mysslserver.pfx')
}
var server = https.createServer(options, app)

var subscription = null

function sendNotification(payload) {
  const options = {
    // gcmAPIKey: '< GCM API Key >',
    vapidDetails: Object.assign({}, vapidKeys, {subject: 'mailto: develop.sample100@gmail.com'})
    // TTL: 100
    // headers: {
    //   '< header name >': '< header value >'
    // },
    // contentEncoding: '< Encoding type, e.g.: aesgcm or aes128gcm >',
    // proxy: '< proxy server address >'
  }
  
  console.log('-----')
  console.log(subscription)
  console.log(payload)
  console.log(options)
  console.log('-----')
  webpush.sendNotification(
    subscription,
    payload,
    options
  )
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/key', (req, res) => {
  console.log('public key取得')
  return res.json({
    publicKey: vapidKeys.publicKey
  })
})

app.post('/sub', (req, res) => {
  console.log('Subscription登録')
  console.log(req.body)
  subscription = req.body
  return subscription
})

app.post('/push', (req, res) => {
  console.log('PUSH通知登録')
  console.log(req.body)
  sendNotification(req.body.text)
  return req.body
})


server.listen(8080, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});


