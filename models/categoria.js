const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

/* De los generos de los libros, solo los nombres, el campo nunca puede ser vacio o nulo y no pueden repetirse las categorias.
Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.

Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.*/

const categoriaSchema = new Schema({
    nombre: {type: String, unique:true, required: true, uniqueCaseInsensitive: true}
})

categoriaSchema.methods.toString = function(){
    return 'Categoria: ' + this.nombre
}

categoriaSchema.statics.allCategorias = function(cb){
    return this.find({}, cb)
}

categoriaSchema.statics.add = function(aCategoria, cb){
    this.create(aCategoria, cb)
}

categoriaSchema.statics.delete = function(id, cb){
    //Borra el esquema
}

categoriaSchema.methods.update = function(id, cb){
    //Actualiza el esquema
}


//Plugins para validar elementos unicos y de autoincremento
categoriaSchema.plugin(mongooseUniqueValidator)
categoriaSchema.plugin(AutoIncrement, {inc_field: 'id'})

module.exports = mongoose.model('Categoria', categoriaSchema)