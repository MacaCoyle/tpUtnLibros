const CategoriaModel = require('../models/categoriaModel');
const LibroModel = require('../models/libroModel');

// Listado de categorias
exports.getAll = async (req, res) => {
    try {
        const listado = await CategoriaModel.find();

        //Comprueba si el array está vacio (si no existen la Categoria => error)
        if (listado.length == 0) {
            throw new Error("No se encuentran categorias registradas.");
        }

        // OK => enviar respuesta
        console.log("Hay Categorias en la base de datos.");
        res.status(200).send(listado);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send([]);
    }
};


// Obtener una categoria
exports.getById = async (req, res) => {
    try {
        const idCategoria = req.params.id;
        const categoria = await CategoriaModel.find({ categoria_id: idCategoria});

        //Comprueba si el array está vacio (si no existe la persona => error)
        if (categoria.length == 0) {
            throw new Error("No se encuentra la categoria solicitada.");
        }

        // OK => enviar respuesta
        console.log("Categoria encontrada.");
        res.status(200).send(categoria);
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};


// Agregar una categoria
exports.create = async (req, res) => {
    try {
        //Chequeamos que nos envien toda la info
        if (!req.body.nombre) {
            throw new Error('Faltan datos!');
        }

        //OK-> Agarramos los datos enviados y los pasamos a Mayusculas
        const nombre = req.body.nombre.toUpperCase();

        //Chequeamos que no nos envíen espacios en blanco
        if (nombre.trim().length == 0) {
            throw new Error("No se pueden enviar datos sólo con espacios.");
        }

        //OK-> Verificamos que no exista la misma categoria
        let respuesta = await CategoriaModel.find({ nombre: nombre});
        if (respuesta.length > 0) {
            throw new Error("Esa categoria ya existe.");
        }

        //OK-> Agregamos categoria a la BD
        const instancia = CategoriaModel({ nombre: nombre});
        respuesta = await instancia.save();
        console.log(respuesta);
        res.status(200).send(respuesta);
    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};


// Eliminar una categoria
exports.delete = async (req, res) => {
    try {
        const idCategoria = req.params.id;
        const categoria = await CategoriaModel.find({ categoria_id: idCategoria });

        // Comprueba si el array está vacio (si no existe la persona => error)
        if (categoria.length == 0) {
            throw new Error("No se encuentra la categoria solicitada.");
        }

        // Comprobamos si hay libros asociados a la categoria
        
        const librosAsociados = await LibroModel.find({ categoria_id: idCategoria });
        if (librosAsociados.length > 0) {
            throw new Error("La categoria tiene libros asociados. No se puede eliminar.");
        }

        // OK => eliminar de la BD
        const filtro = { categoria_id: idCategoria };
        const respuesta = await CategoriaModel.remove(filtro);

        console.log(respuesta);
        res.status(200).send({"Mensaje": "La categoria se borró correctamente."});
        }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Mensaje": e.message});
    }
};
