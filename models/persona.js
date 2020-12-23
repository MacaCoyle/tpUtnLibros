const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* 
De la persona a prestar los libros el nombre, apellido, email y alias. El email debe ser unico. Todos los datos son requeridos. 
Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.

Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.
*/

const personaSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    alias: String
})

module.exports = mongoose.model('Categoria', personaSchema)