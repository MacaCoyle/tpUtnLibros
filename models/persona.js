const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

/* 
De la persona a prestar los libros el nombre, apellido, email y alias. El email debe ser unico. Todos los datos son requeridos. 
Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.

Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.
*/

const personaSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, unique: true, required: true, uniqueCaseInsensitive: true}, 
    alias: {type: String, required: true}
})

personaSchema.methods.toString = function(){
    return `Nombre: ${this.nombre} Apellido: ${this.apellido} Email: ${this.email} Alias: ${this.alias}`
}

personaSchema.statics.allPersonas = function(cb){
    return this.find({}, cb)
}

personaSchema.statics.add = function(aPersona, cb){
    this.create(aPersona, cb)
}


//Plugins para validar elementos unicos y de autoincremento
personaSchema.plugin(mongooseUniqueValidator)
categoriaSchema.plugin(AutoIncrement, {inc_field: 'id'})

module.exports = mongoose.model('Persona', personaSchema)