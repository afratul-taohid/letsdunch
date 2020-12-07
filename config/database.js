require('dotenv').config()
const mongoose = require('mongoose')

/// connect with mongo darabase
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.once('open', () => console.log('connected to database'))