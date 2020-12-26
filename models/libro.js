const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* De los libros, el nombre, una descripcion, su categoria y la persona a la cual se le ha prestado el libro. Para representar que un libro se encuentra en la biblioteca se puede utilizar cualquiera de las siguientes estrategias: null para libros en la biblioteca en el campo de persona_id, que el usuario se encuentre ingresado como una persona mas. 
Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.

Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.
*/

const libroSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    categoria : {type: Schema.ObjectId, ref: 'Categoria', required: true },
    tenedor: {type: Schema.ObjectId, ref: 'Persona'}
})

libroSchema.methods.toString = function(){
    return `Libro: ${this.nombre} Descripcion: ${this.descripcion} Categoria: ${this.categoria} Quien lo tiene: ${this.tenedor}`
}

libroSchema.statics.allLibros = function(cb){
    return this.find({}, cb)
}

libroSchema.statics.add = function(aLibro, cb){
    this.create(aLibro, cb)
}

module.exports = mongoose.model('Libro', libroSchema)