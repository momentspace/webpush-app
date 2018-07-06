const express = require('express')
const app = express()
const webpush = require('web-push');
const vapidKeys = require('./keys.json')

app.get('/key', (req, res) => {
  return res.json({
    publicKey: vapidKeys.publicKey
  })
})


var server = app.listen(8080, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});


