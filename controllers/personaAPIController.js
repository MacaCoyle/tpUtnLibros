const PersonaModel = require('../models/personaModel');


 // Listado de personas
exports.getAll = async (req, res) => {
    try {
        const listado = await PersonaModel.find();

        //Comprueba si el array está vacio (si no existen la personas => error)
        if (listado.length == 0) {
            throw new Error("No se encuentran personas registradas");
        }

        // OK => enviar respuesta
        console.log("Hay personas en la base de datos");
        res.status(200).send(listado);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({});
    }
};


// Obtener una persona
exports.getById = async (req, res) => {
    try {
        const idPersona = req.params.id;
        const persona = await PersonaModel.find({ id: idPersona });

        //Comprueba si el array está vacio (si no existe la persona => error)
        if (persona.length == 0) {
            throw new Error("No se encuentra la persona solicitada");
        }

        // OK => enviar respuesta
        console.log("Persona encontrada");
        res.status(200).send(persona);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({});
    }
};


// Agregar una persona
exports.create = async (req, res) => {
    try {
        //Chequeamos que nos envien toda la info
        if (!req.body.nombre || !req.body.apellido || !req.body.alias || !req.body.email ) {
            throw new Error('Faltan datos!');
        }

        //OK. Agarramos los datos enviados y los pasamos a Mayusculas
        const nombre = req.body.nombre.toUpperCase();
        const apellido = req.body.apellido.toUpperCase();
        const alias = req.body.alias.toUpperCase();
        const email = req.body.email.toUpperCase();

        //Verificamos que no exista la misma persona (email)
        let respuesta = await PersonaModel.find({ email: email});
        if (respuesta.length > 0) {
            throw new Error("Esa persona ya existe");
        }

        //OK-> Agregamos persona a la BD
        const instancia = PersonaModel({ nombre: nombre, apellido: apellido, alias: alias, email: email });
        respuesta = await instancia.save();
        console.log(respuesta);
        res.status(200).send(respuesta);

    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"Error": e.message});
    }
};

// Actualizar una persona
exports.update = async (req, res) => {
    try {
        /**
         * lógica y consultas BD para UDPATES
         */
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({});
    }
};


// Eliminar una persona
exports.delete = async (req, res) => {
    try {
        /**
         * lógica y consultas BD para DELETE
         */
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({});
    }
};
