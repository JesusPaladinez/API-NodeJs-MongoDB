// El framework express sirve para crear servidores y manejar rutas
const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const fichasSchema = require("../models/fichas");

// Mostrar todas las fichas
router.get("/mostrarFichas", (req, res) => {
    fichasSchema
    .find() // Método para encontrar todas las fichas
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// Mostrar una ficha en específico
router.get("/mostrarFicha/:id", (req, res) => {
    const { id } = req.params;
    fichasSchema
    .findById(id) // Encontrar con el id
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// Crear ficha
router.post("/crearFicha", (req, res) => {
  const ficha = fichasSchema(req.body);
  ficha
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Actualizar ficha
router.put("/actualizarFicha/:id", (req, res) => {
    const { id } = req.params;
    const { numeroFicha, aprendicesActuales, aprendicesMatriculados, jornada, tipoFormacion } = req.body;
    fichasSchema
    .updateOne({ _id: id }, { $set: {numeroFicha, aprendicesActuales, aprendicesMatriculados, jornada, tipoFormacion }})
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// Eliminar ficha
router.delete("/eliminarFicha/:id", (req, res) => {
    const { id } = req.params;
    fichasSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }))
})

// Se exportan las rutas
module.exports = router;
