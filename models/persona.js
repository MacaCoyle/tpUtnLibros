const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* 
De la persona a prestar los libros el nombre, apellido, email y alias. El email debe ser unico. Todos los datos son requeridos. 
*/



module.exports = mongoose.model('Categoria', personaSchema)