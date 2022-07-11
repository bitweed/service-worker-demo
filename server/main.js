const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')
const app = express()

app.use(cors())
app.use(bodyParser.json())
const port = 4000

app.get('/', (req, res) => res.send('Hello World!'))
const dummyDb = { subscription: null }
const saveToDatabase = async subscription => {
  dummyDb.subscription = subscription
}

app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  await saveToDatabase(subscription)
  res.json({ message: 'success' })
})
const vapidKeys = {
  publicKey:
    'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk',
  privateKey: 'ERIZmc5T5uWGeRxedxu92k3HnpVwy_RCnQfgek1x2Y4',
}

webpush.setVapidDetails(
  'mailto:bitweed@volare.finance',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const sendNotification = (subscription, dataToSend) => {
  webpush.sendNotification(subscription, dataToSend)
}

app.get('/send-notification', (req, res) => {
  const subscription = dummyDb.subscription //get subscription from your databse here.
  const message = 'Hello World'
  sendNotification(subscription, message)
  res.json({ message: 'message sent' })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
