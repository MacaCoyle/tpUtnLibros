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
        res.status(413).send({});
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
        res.status(413).send({});
    }
};


// Agregar un libro
exports.create = async (req, res) => {
    try {
        //Chequeamos que nos envien toda la info
        if (!req.body.nombre || !req.body.descripcion || !req.body.categoria_id ) {
            throw new Error('Faltan datos!');
        }
        let categoria_id = req.body.categoria_id
        let persona_id = req.body.persona_id

        //Buscamos los campos relacionados con el id
        const perMo = await personaModel.find ({id : persona_id})
        const catMo = await categoriaModel.find({categoria_id : categoria_id})

        //Si no existe el ID persona
        if(perMo == 0){
          throw new Error('No existe el id de persona')
        }

        //Si no existe el ID categoria
        if(catMo == 0){
          throw new Error('No existe la categoria')
        }

        //Creamos los campos para cargar el libro
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        persona_id = perMo[0]._id;
        categoria_id = catMo[0]._id;

        //Verificamos que no exista el misma libro (nombre)
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
        res.status(413).send({"Error": e.message});
    }
};

// Actualizar un libro
exports.update = async (req, res) => {
    try {
        /**
         * lógica y consultas BD para UDPATES
         */

        //Verificamos que sí exista el libro (id)
        const idLibro = req.params.id;
        const respuesta = await LibroModel.find({ libro_id: idLibro });

        console.log(respuesta)

        if (respuesta.length == 0) {
            throw new Error("El libro que querés modificar no existe");
        }
        
        //OK => Chequeamos que nos envien toda la info
        if (!req.body.nombre || !req.body.descripcion || !req.body.categoria_id ) {
            throw new Error('Faltan datos!');
        }

        //OK. Agarramos los datos enviados y los pasamos a Mayusculas
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const categoria_id = req.body.categoria_id;
        const persona_id = req.body.persona_id;

        console.log(respuesta[0].nombre)
        console.log(respuesta[0].categoria_id)
        console.log(respuesta[0].persona_id)
        
        if(respuesta[0].nombre != nombre || respuesta[0].categoria_id != categoria_id || respuesta[0].persona_id != persona_id){
          throw new Error('Solo se puede modificar la descripcion')
        }


        //OK => actualizamos BD
        await LibroModel.findOneAndUpdate(respuesta, { descripcion : descripcion});

        //Traemos nuevamente a la persona ahora actualizada y la enviamos
        let libroActualizado = await LibroModel.find({ libro_id: idLibro });
        console.log(libroActualizado);
        res.status(200).send(libroActualizado);
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
