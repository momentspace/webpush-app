const webpush = require('web-push')
const vapIDKeys = webpush.generateVAPIDKeys()
console.log(JSON.stringify(vapIDKeys))
