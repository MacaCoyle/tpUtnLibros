var router = require('express').Router();

const personaAPIController = require("../controllers/personaAPIController");

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
router.put("/persona", personaAPIController.update);
router.delete("/persona", personaAPIController.delete);



module.exports = router;