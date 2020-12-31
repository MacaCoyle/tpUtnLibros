var app = require('express').Router();
var PersonaModel = require('../models/personaModel');


/**
 * API de Persona
 *  GET /api/persona -> listado de todos las personas
 *  GET /api/persona/:id -> Obtener la persona cuyo ID es pasado como parametro
 *  POST /api/persona -> Agregar una persona
 *  PUT /api/persona/:id -> Actualizar los datos de la persona cuyo ID es pasado como parametro
 *  DELETE /api/persona/:id -> Borrar la persona cuyo ID es pasado como parametro
 * 
 */


// Listado de personas
app.get('/', function (req, res, next) {
        PersonaModel.find({}, (err, listado) => {
            if (err) {
                next(new Error('No se pudieron obtener las personas'));
                return;
            }
            res.send(listado);
        });
    });

// Obtener una persona
app.get('/:id', function (req, res, next) {
        var idPersona = req.params.id;
        PersonaModel.findById(idPersona, (err, persona) => {
            if (err) {
                next(new Error('No se encontro la persona'));
            }
            res.send(persona);
        });
    });

// Agregar una persona
app.post('/', function (req, res, next) {
        var nombre = req.body.nombre;
        var instancia = new PersonaModel({ nombre: nombre });
        instancia.save((err, persona) => {
            if (err) {
                next(new Error('No se pudo guardar la persona'));
            }
            res.status(200).send(persona);
        });
    });

// Actualizar una persona
app.put('/:id', function (req, res, next) {
        var idPersona = req.params.id;
        var nombreNuevo = req.body.nombre;
        PersonaModel.findByIdAndUpdate(idPersona, { nombre: nombreNuevo }, (err, persona) => {
            if (err) {
                next(new Error('No se pudo actualizar la persona'));
            }
            res.send(persona);
        });
    });

// Borrar una persona
app.delete('/:id', function (req, res, next) {
        var idPersonaABorrar = req.params.id;
        PersonaModel.findByIdAndRemove(idPersonaABorrar, (err, persona) => {
            if (err) {
                next(new Error('No se pudo borrar el artista'));
            }
            res.status(204).send(); // Codigo HTTP 204 Sin contenido (no hay nada que responder, pero la operacion fue exitosa)
        });
    });

module.exports = app;