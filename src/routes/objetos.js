const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const objetosSchema = require("../models/objetos");

// Mostrar todos los objetos
router.get("/mostrarObjetos", (req, res) => {
  objetosSchema
    .find() // Método para encontrar todos los objetos
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Mostrar objeto
router.get("/mostrarObjeto/:id", (req, res) => {
    const { id } = req.params;
    objetosSchema
    .findById(id) // Encontrar objeto con un id
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// Crear objeto
router.post("/crearObjeto", (req, res) => {
  const objeto = objetosSchema(req.body);
  objeto
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Actualizar objeto
router.put("/actualizarObjeto/:id", (req, res) => {
    const { id } = req.params;
    const { marca, codigo } = req.body;
    objetosSchema
    .updateOne({ _id: id}, { $set: { marca, codigo }})
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// Eliminar objeto
router.delete("/eliminarObjeto/:id", (req, res) => {
    const { id } = req.params;
    objetosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// Se exportan las rutas
module.exports = router;
