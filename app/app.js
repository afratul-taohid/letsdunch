const express = require('express')
const bodyParser = require('body-parser')
const {errors} = require('celebrate')

const app = express()

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}))

// /// Accept json in express server
app.use(bodyParser.json())
   
// /// add all http route
app.use(errors())

module.exports = app