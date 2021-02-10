var router = require('express').Router();

const personaAPIController = require("../controllers/personaAPIController");
const libroAPIController = require("../controllers/libroAPIController")
const categoriaAPIController = require("../controllers/categoriaAPIController")

/**
 * API de Persona
 *  GET /persona -> listado de todos las personas
 *  GET /persona/:id -> Obtener la persona cuyo ID es pasado como parametro
 *  POST /persona -> Agregar una persona
 *  PUT /persona/:id -> Actualizar los datos de la persona cuyo ID es pasado como parametro
 *  DELETE /persona/:id -> Borrar la persona cuyo ID es pasado como parametro
 * 
 */
router.get("/persona", personaAPIController.getAll);
router.get("/persona/:id", personaAPIController.getById);
router.post("/persona", personaAPIController.create);
router.put("/persona/:id", personaAPIController.update);
router.delete("/persona/:id", personaAPIController.delete);



/**
 * API de Libro
 *  GET /libro -> listado de todos las libros
 *  GET /libro/:id -> Obtener la libro cuyo ID es pasado como parametro
 *  POST /libro -> Agregar una libro
 *  PUT /libro/:id -> Actualizar los datos de la libro cuyo ID es pasado como parametro
 *  PUT /libro/prestar/:id -> Actualizar los datos con los datos de la persona a la cual se presta el libro
 *  PUT /libro/devolver/:id -> Actualizar los datos del libro para marcar que se devolvio
 *  DELETE /libro/:id -> Borrar la libro cuyo ID es pasado como parametro
 * 
 */

router.get("/libro", libroAPIController.getAll);
router.get("/libro/:id", libroAPIController.getById);
router.post("/libro", libroAPIController.create);
router.put("/libro/:id", libroAPIController.update);

router.put("/libro/prestar/:id", libroAPIController.prestar);
router.put("/libro/devolver/:id", libroAPIController.devolver);

router.delete("/libro/:id", libroAPIController.delete);


//CATEGORIA
router.get("/categoria", categoriaAPIController.getAll);
router.get("/categoria/:id", categoriaAPIController.getById);
router.post("/categoria", categoriaAPIController.create);
router.delete("/categoria/:id", categoriaAPIController.delete);


module.exports = router;