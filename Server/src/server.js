const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const postCharge = require('./stripe')

const app = express()
const router = express.Router()
const port = process.env.PORT || 7000

// Handling POST request to route using stripe dependency
router.post('/stripe/charge', postCharge)
router.all('*', (_, res) =>
  res.json({ message: 'please make a POST request to /stripe/charge' })
)

// Enabling CORS for all request
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// using body parser to parse JSON 
app.use(bodyParser.json())

// handling request
app.use('/api', router)

// serving the build folder
app.use(express.static(path.join(__dirname, '../build')))

// Handling GET requests by serving the index.html of the build folder
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})

app.listen(port, () => console.log(`server running on port ${port}`))
