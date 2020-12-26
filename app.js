const { urlencoded } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT ? process.env.PORT : 3000


var mongoDB = 'mongodb://localhost/whereismybook'
mongoose.connect(mongoDB, {useNewUrlParser: true})
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '))


app.use(urlencoded())
app.use(express.json());

app.listen(port, () => {
    console.log('Im alive at port: ' + port)
})
