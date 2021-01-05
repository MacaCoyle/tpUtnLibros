const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const personaSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  alias: { type: String, required: true },
  email: { type: String, required: true}
});

//Plugins para validar elementos unicos y de autoincremento
personaSchema.plugin(mongooseUniqueValidator);
personaSchema.plugin(AutoIncrement, { inc_field: "persona_id" });

// Creamos un model (es la representacion de la persona en nuestro sistema)
var PersonaModel = mongoose.model("Persona", personaSchema);
module.exports = PersonaModel;
