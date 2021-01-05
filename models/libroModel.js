const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

/* De los libros, el nombre, una descripcion, su categoria y la persona a la cual se le ha prestado el libro. Para representar que un libro se encuentra en la biblioteca se puede utilizar cualquiera de las siguientes estrategias: null para libros en la biblioteca en el campo de persona_id, que el usuario se encuentre ingresado como una persona mas. 
Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.

Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.
*/

const libroSchema = new Schema({
  nombre: { type: String, required: true, uniqueCaseInsensitive: true, unique: true },
  descripcion: { type: String, required: true },
  categoria_id: { type: Number, ref: "Categoria", required: true },
  persona_id: { type: Number, ref: "Persona" },
});


//Plugins para validar elementos unicos y de autoincremento
libroSchema.plugin(mongooseUniqueValidator);
libroSchema.plugin(AutoIncrement, { inc_field: "libro_id" });

// Creamos un model (es la representacion del libro en nuestro sistema)
var LibroModel = mongoose.model("Libro", libroSchema);
module.exports = LibroModel;
