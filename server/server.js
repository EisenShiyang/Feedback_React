const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// import router
const feedbackRoutes = require('./routes/feedback')

// app
const app = express()

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.unsubscribe(cors());

// route
app.use('/api', feedbackRoutes)

// port used to listen the app
const port = process.env.PORT || 3002
app.listen(port, () => console.log(`Server is running on port: ${port}`));