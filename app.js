const express = require("express");
const app = express();
const mongoose = require("mongoose");
var PersonaModel = require("./models/personaModel");
const { urlencoded } = require("body-parser");

const port = process.env.PORT ? process.env.PORT : 3000;

// Conexion con la base de datos MongoDB
var mongoDB = "mongodb://localhost/whereismybook";
//Propuesta de código alternativo:
mongoose.connect(mongoDB, { useNewUrlParser: true }).then( () => {
    // Conexion exitosa
    console.log('Conexion exitosa con MongoDB');
}).catch( (err) => {
    console.log('No me pude conectar con MongoDB');
    console.log(err);
});
/*
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
*/

var myLogger = function(req, res, next) { // Esta funcion se va a ejecutar en cada peticion
    console.log('Paso por el logger');
    next();
};


app.use(urlencoded());
app.use(express.json());

app.use(myLogger);

//Prueba de servidor.
app.get("/", (req, res) => {
  res.send("Estas vivo en el: " + port);
});


//Comienza aplicacion
//API
//app.use('/api/categoria', require('./controllers/categoriaAPIController'));
//app.use('/api/libro', require('./controllers/libroPIController'));
app.use('/api/persona', require('./controllers/personaAPIController'));

app.listen(port, () => {
  console.log("Im alive at port: " + port);
});
