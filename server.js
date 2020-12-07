require('./config/database')
require('dotenv').config()
const config = require('./config/config')
const {errors} = require('celebrate')
const cors = require('cors')
const helmet = require('helmet');
const session = require('express-session')
const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./app/routes/user_route')
const app = express()

// Accept json in express server
app.use(bodyParser.json({limit: '50mb', extended: true}))
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(session({secret : process.env.TOKEN_SECRET, resave : false, saveUninitialized : true}))
app.enable("trust proxy")
app.use(cors())
app.use(helmet())

//add all the http route
app.use(userRoute)




// Use for validation
app.use(errors())
// initialize the server
app.listen(config.PORT, () => console.log("Server Started -> Port", config.PORT))
app.get('/', (req, res) => res.send('Welcome to Letsdunch Backend Server'))