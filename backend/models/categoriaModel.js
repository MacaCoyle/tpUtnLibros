const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

/* De los generos de los libros, solo los nombres, el campo nunca puede ser vacio o nulo y no pueden repetirse las categorias.
Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.

Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.*/

const categoriaSchema = new Schema({
  nombre: { type: String,unique: true, required: true, uniqueCaseInsensitive: true }
});

//Plugins para validar elementos unicos y de autoincremento
categoriaSchema.plugin(mongooseUniqueValidator);
categoriaSchema.plugin(AutoIncrement, { inc_field: "categoria_id" });

// Creamos un model (es la representacion de la categoria en nuestro sistema)
var CategoriaModel = mongoose.model("Categoria", categoriaSchema);
module.exports = CategoriaModel;


