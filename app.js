const { urlencoded } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const port = 3000

app.use(urlencoded())
app.use(express.json());

app.listen(port, () => {
    console.log('Im alive at port: ' + port)
})
