const LibroModel = require("../models/libroModel")
const personaModel = require("../models/personaModel")
const categoriaModel = require("../models/categoriaModel");

// Listado de Libros
exports.getAll = async (req, res) => {
    try {
        const listado = await LibroModel.find();

        //Comprueba si el array está vacio (si no existen la Libros => error)
        if (listado.length == 0) {
            throw new Error("No se encuentran Libros registrados");
        }

        // OK => enviar respuesta
        console.log("Hay Libros en la base de datos");
        res.status(200).send(listado);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};


// Obtener un libro
exports.getById = async (req, res) => {
    try {
        const idLibro = req.params.id;
        const libro = await LibroModel.find({ libro_id: idLibro});

        //Comprueba si el array está vacio (si no existe la libro => error)
        if (libro.length == 0) {
            throw new Error("No se encuentra la libro solicitado");
        }

        // OK => enviar respuesta
        console.log("libro encontrado");
        res.status(200).send(libro);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};


// Agregar un libro
exports.create = async (req, res) => {
    try {
        //Chequeamos que nos envien toda la info
        if (!req.body.nombre || !req.body.categoria_id ) {
            throw new Error('Nombre y categoria son datos obligatorios.');
        }

        let categoria_id = req.body.categoria_id
        let persona_id = req.body.persona_id

        if (persona_id) {
            const perMo = await personaModel.find ({persona_id : persona_id});
            //Si no existe el ID persona
            if(perMo == 0){
                throw new Error('No existe el id de persona');
            }
        } else {
            persona_id = null;
        }

        //Buscamos los campos relacionados con el id
        const catMo = await categoriaModel.find({categoria_id : categoria_id});

        //Si no existe el ID categoria
        if(catMo == 0){
          throw new Error('No existe la categoria');
        }

        //Creamos los campos para cargar el libro
        const nombre = req.body.nombre.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase();

        //Chequeamos que no nos envíen espacios en blanco
        if (nombre.trim().length == 0 || descripcion.trim().length == 0 ) {
            throw new Error("No se pueden enviar datos sólo con espacios.");
        }

        //Verificamos que no exista el mismo libro (nombre)
        let respuesta = await LibroModel.find({ nombre: nombre});
        if (respuesta.length > 0) {
            throw new Error("Ese libro ya existe");
        }

        //OK-> Agregamos libro a la BD
        const instancia = LibroModel({ nombre: nombre, descripcion: descripcion, categoria_id: categoria_id, persona_id: persona_id });
        respuesta = await instancia.save();
        console.log(respuesta);
        res.status(200).send(respuesta);

    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};

// Actualizar un libro
exports.update = async (req, res) => {
    try {
        //Verificamos que sí exista el libro (id)
        const idLibro = req.params.id;
        const libroDB = await LibroModel.find({ libro_id: idLibro });

        if (libroDB.length == 0) {
            throw new Error("El libro que querés modificar no existe");
        }
        
        //OK => Chequeamos que nos envien toda la info
        if (!req.body.nombre || !req.body.categoria_id ) {
            throw new Error('Faltan datos!');
        }

        //OK. Agarramos los datos enviados y los pasamos a Mayusculas
        const nombre = req.body.nombre.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase();
        const categoria_id = req.body.categoria_id;
        const persona_id = req.body.persona_id;

        //Chequeamos que no nos envíen espacios en blanco
        if (nombre.trim().length == 0 || descripcion.trim().length == 0 ) {
            throw new Error("No se pueden enviar datos sólo con espacios.");
        }

        if(libroDB[0].nombre != nombre || libroDB[0].categoria_id != categoria_id || libroDB[0].persona_id != persona_id){
          throw new Error('Solo se puede modificar la descripcion')
        }

        //OK => actualizamos BD
        const filtro = { libro_id: idLibro };
        const cambios = { descripcion : descripcion };
        await LibroModel.findOneAndUpdate(filtro, cambios);

        //Traemos nuevamente al ahora actualizada y la enviamos
        let libroActualizado = await LibroModel.find({ libro_id: idLibro });
        console.log(libroActualizado);
        res.status(200).send(libroActualizado);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};


// Eliminar un libro
exports.delete = async (req, res) => {
    try {

        const idLibro = req.params.id;
        const libro = await LibroModel.find({ libro_id: idLibro });

        // Comprueba si el array está vacio
        if (libro.length == 0) {
            throw new Error("No se encuentra ese libro.");
        }

        // Comprobamos si hay persona asociada al libro
        const personaAsociada = libro[0].persona_id;
        if (personaAsociada > 0) {
            throw new Error("El libro tiene una persona asociada. No se puede eliminar.");
        }
        // OK => eliminar de la BD
        const filtro = { libro_id: idLibro };
        const respuesta = await LibroModel.remove(filtro);

        console.log(respuesta);
        res.status(200).send({"Mensaje": "El libro se borró correctamente."});
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};




// PRESTAR un libro
exports.prestar = async (req, res) => {
    try {
        //Verificamos que sí exista el libro (id)
        const idLibro = req.params.id;
        const idPersona = req.body.persona_id;

        //OK => Chequeamos que nos envien toda la info
        if (!idLibro || !idPersona ) {
            throw new Error('Faltan datos!');
        }

        //Verificar que el libro existe
        const libroDB = await LibroModel.find({ libro_id: idLibro });
        if (libroDB.length == 0) {
            throw new Error("El libro que querés prestar no existe");
        }

        //Verificar que el libro no este prestado
        if (libroDB[0].persona_id != null) {
            throw new Error("El libro que querés prestar ya está prestado");
        }

        //Verificar que la persona existe
        const personaDB = await personaModel.find({ persona_id: idPersona });
        if (personaDB.length == 0) {
            throw new Error("La persona a la que le querés prestar no existe");
        }

        //OK => actualizamos BD
        const filtro = { libro_id: idLibro };
        const cambios = { persona_id : idPersona };
        await LibroModel.findOneAndUpdate(filtro, cambios);

        //Traemos nuevamente al ahora actualizada y la enviamos
        let libroActualizado = await LibroModel.find({ libro_id: idLibro });
        console.log(libroActualizado);
        res.status(200).send(libroActualizado);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};

// DEVOLVER un libro
exports.devolver = async (req, res) => {
    try {
        //Verificamos que sí exista el libro (id)
        const idLibro = req.params.id;

        //Verificar que el libro existe
        const libroDB = await LibroModel.find({ libro_id: idLibro });
        if (libroDB.length == 0) {
            throw new Error("El libro que querés devolver no existe");
        }

        //Verificar que el libro SÍ este prestado
        if (libroDB[0].persona_id == null) {
            throw new Error("El libro que querés devolver no estaba prestado");
        }

        //OK => actualizamos BD
        const filtro = { libro_id: idLibro };
        const cambios = { persona_id : null };
        await LibroModel.findOneAndUpdate(filtro, cambios);

        //Traemos nuevamente al ahora actualizada y la enviamos
        let libroActualizado = await LibroModel.find({ libro_id: idLibro });
        console.log(libroActualizado);
        res.status(200).send(libroActualizado);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};
