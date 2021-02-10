const PersonaModel = require('../models/personaModel');
const LibroModel = require('../models/libroModel');

 // Listado de personas
exports.getAll = async (req, res) => {
    try {
        const listado = await PersonaModel.find();

        //Comprueba si el array está vacio (si no existen la personas => error)
        if (listado.length == 0) {
            throw new Error("No se encuentran personas registradas.");
        }

        // OK => enviar respuesta
        console.log("Hay personas en la base de datos.");
        res.status(200).send(listado);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send([]);
    }
};


// Obtener una persona
exports.getById = async (req, res) => {
    try {
        const idPersona = req.params.id;
        const persona = await PersonaModel.find({ persona_id: idPersona});

        //Comprueba si el array está vacio (si no existe la persona => error)
        if (persona.length == 0) {
            throw new Error("No se encuentra la persona solicitada.");
        }

        // OK => enviar respuesta
        console.log("Persona encontrada.");
        res.status(200).send(persona);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};


// Agregar una persona
exports.create = async (req, res) => {
    try {
        //Chequeamos que nos envien toda la info
        if (!req.body.nombre || !req.body.apellido || !req.body.alias || !req.body.email ) {
            throw new Error('Faltan datos!');
        }

        //OK-> Agarramos los datos enviados y los pasamos a Mayusculas
        const nombre = req.body.nombre.toUpperCase();
        const apellido = req.body.apellido.toUpperCase();
        const alias = req.body.alias.toUpperCase();
        const email = req.body.email.toUpperCase();

        //Chequeamos que no nos envíen espacios en blanco
        if (nombre.trim().length == 0 || apellido.trim().length == 0 || alias.trim().length == 0 || email.trim().length == 0) {
            throw new Error("No se pueden enviar datos sólo con espacios.");
        }

        //OK-> Verificamos que no exista la misma persona (email)
        let respuesta = await PersonaModel.find({ email: email});
        if (respuesta.length > 0) {
            throw new Error("El email ya se encuentra registrado.");
        }

        //OK-> Agregamos persona a la BD
        const instancia = PersonaModel({ nombre: nombre, apellido: apellido, alias: alias, email: email });
        respuesta = await instancia.save();
        console.log(respuesta);
        res.status(200).send(respuesta);

    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};

// Actualizar una persona
exports.update = async (req, res) => {
    try {
        //Verificamos que sí exista la persona (id)
        const idPersona = req.params.id;
        const respuesta = await PersonaModel.find({ persona_id: idPersona });

        if (respuesta.length == 0) {
            throw new Error("La persona que querés modificar no existe.");
        }
        
        //OK-> Chequeamos que nos envien toda la info
        if (!req.body.nombre || !req.body.apellido || !req.body.alias || !req.body.email ) {
            throw new Error('Faltan datos!');
        }

        //OK-> Agarramos los datos enviados y los pasamos a Mayusculas
        const nombre = req.body.nombre.toUpperCase();
        const apellido = req.body.apellido.toUpperCase();
        const alias = req.body.alias.toUpperCase();
        const email = req.body.email.toUpperCase();

        //Chequeamos que no nos envíen espacios en blanco
        if (nombre.trim().length == 0 || apellido.trim().length == 0 || alias.trim().length == 0 || email.trim().length == 0) {
            throw new Error("No se pueden enviar datos sólo con espacios.");
        }

        //Verificamos que el email sea el mismo registrado en la BD
        if (email != respuesta.map(respuesta => respuesta.email)) { // Map: ya que respuesta es un array
            throw new Error("El email no puede ser modificado.");
        }

        //OK => actualizamos BD
        const filtro = { persona_id: idPersona };
        const cambios = { nombre: nombre, apellido: apellido, alias: alias };
        await PersonaModel.findOneAndUpdate(filtro, cambios);

        //Traemos nuevamente a la persona ahora actualizada y la enviamos
        let personaActualizada = await PersonaModel.find({ persona_id: idPersona });
        console.log(personaActualizada);
        res.status(200).send(personaActualizada);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};


// Eliminar una persona
exports.delete = async (req, res) => {
    try {
        const idPersona = req.params.id;
        const persona = await PersonaModel.find({ persona_id: idPersona });

        // Comprueba si el array está vacio (si no existe la persona => error)
        if (persona.length == 0) {
            throw new Error("No se encuentra la persona solicitada.");
        }

        // Comprobamos si hay libros asociados a la persona
        const librosAsociados = await LibroModel.find({ persona_id: idPersona });
        if (librosAsociados.length > 0) {
            throw new Error("La persona tiene libros asociados. No se puede eliminar.");
        }

        // OK => eliminar de la BD
        const filtro = { persona_id: idPersona };
        const respuesta = await PersonaModel.remove(filtro);

        console.log(respuesta);
        res.status(200).send({"Mensaje": "La persona se borró correctamente."});
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};
