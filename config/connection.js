const { connect, connection } = require('mongoose')
require('dotenv').config()

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughtblrDB'
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = connection