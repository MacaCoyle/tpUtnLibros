const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");

const port = process.env.PORT ? process.env.PORT : 3000;

// Conexion con la base de datos MongoDB
var mongoDB = "mongodb://localhost/whereismybook";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

//Prueba de servidor.
app.get("/", (req, res) => {
  res.send("Estas vivo en el: " + port);
});

app.use(urlencoded());
app.use(express.json());

//Comienza aplicacion
app.use('/api/persona', require('./controllers/personaAPIController')); // API

app.listen(port, () => {
  console.log("Im alive at port: " + port);
});
