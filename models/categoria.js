const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* De los generos de los libros, solo los nombres, el campo nunca puede ser vacio o nulo y no pueden repetirse las categorias.
Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.

Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.*/

const categoriaSchema = new Schema({
    nombre: String
})

module.exports = mongoose.model('Categoria', categoriaSchema)