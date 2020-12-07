require('./config/database')
const config = require('./config/config')
const app = require('./app/app')

/// initialize the server
app.listen(config.PORT, () => console.log("Server Started -> Port", config.PORT))

app.get('/', (req, res) => res.send('Welcome to Letsdunch Backend Server'))