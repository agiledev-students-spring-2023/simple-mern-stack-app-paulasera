require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the database models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle the About page
app.get('/about', (req, res) => {
  // retrieve information, such as text and URL to images, as JSON data
  res.json({
    text: 'I am a senior at NYU majoring in Computer Science and minoring in Physics and Web Application Development.',
    text2: 'I own three cats named Gigi, Miso, and Isa. My roommate also has a 3-legged bunny named Waffles.',
    text3: 'I like rollerskating, hiking, and cooking; however, I am usually too tired to do any of these things.',
    text4: 'I like to fill my home with flowers and antiques. That is where I spend most of my time since rent in NYC is ridiculous.',
    img_url: 'https://media.licdn.com/dms/image/D4E03AQHCfUcWyp5SSA/profile-displayphoto-shrink_200_200/0/1669106103762?e=1681948800&v=beta&t=eKkhwl-SKtTEj5lY-xLYHqCW9SRG-qggUXmJVUS_SPk',
    text5: 'My hopes and dreams are to escape the labor force and move off-grid. My compromise is to work in tech and shop at farmers markets.',
    text6: 'My nightmare blunt rotation is Elon Musk, Mark Zuckerberg, and literally any of the anchors on Fox News.',
    text7: 'It has been fun learning about full-stack development and I hope to master it so well I can live out my dreams of being the Elle Woods of STEM.',
    text8: 'Toodles, with love, PS',
  })
})

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
