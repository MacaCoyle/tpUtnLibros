var router = require("express").Router();
const cors = require("cors");

/**
 * API de Persona
 *  GET /persona -> listado de todos las personas
 *  GET /persona/:id -> Obtener la persona cuyo ID es pasado como parametro
 *  POST /persona -> Agregar una persona
 *  PUT /persona/:id -> Actualizar los datos de la persona cuyo ID es pasado como parametro
 *  DELETE /persona/:id -> Borrar la persona cuyo ID es pasado como parametro
 *
 */
const personaAPIController = require("../controllers/personaAPIController");
router.get("/persona", cors(), personaAPIController.getAll);
router.get("/persona/:id", cors(), personaAPIController.getById);
router.post("/persona", cors(), personaAPIController.create);
router.put("/persona/:id", cors(), personaAPIController.update);
router.delete("/persona/:id", cors(), personaAPIController.delete);

/**
 * API de Libro
 *  GET /libro -> listado de todos las libros
 *  GET /libro/:id -> Obtener la libro cuyo ID es pasado como parametro
 *  POST /libro -> Agregar una libro
 *  PUT /libro/:id -> Actualizar los datos de la libro cuyo ID es pasado como parametro
 *  PUT /libro/prestar/:id -> Actualizar los datos con los datos de la persona a la cual se presta el libro
 *  PUT /libro/devolver/:id -> Actualizar los datos del libro para marcar que se devolvio
 *  DELETE /libro/:id -> Borrar la libro cuyo ID es pasado como parametro
 */
const libroAPIController = require("../controllers/libroAPIController");
router.get("/libro", cors(), libroAPIController.getAll);
router.get("/libro/:id", cors(), libroAPIController.getById);
router.post("/libro", cors(), libroAPIController.create);
router.put("/libro/:id", cors(), libroAPIController.update);
router.put("/libro/prestar/:id", cors(), libroAPIController.prestar);
router.put("/libro/devolver/:id", cors(), libroAPIController.devolver);
router.delete("/libro/:id", cors(), libroAPIController.delete);

/**
 * API de Categoria
 */
const categoriaAPIController = require("../controllers/categoriaAPIController");
router.get("/categoria", cors(), categoriaAPIController.getAll);
router.get("/categoria/:id", cors(), categoriaAPIController.getById);
router.post("/categoria", cors(), categoriaAPIController.create);
router.delete("/categoria/:id", cors(), categoriaAPIController.delete);

module.exports = router;
