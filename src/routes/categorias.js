// El framework express sirve para crear servidores y manejar rutas
const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const categoriasSchema = require("../models/categorias");

// Mostrar todas las categorias
router.get("/categoria", (req, res) => {
  categoriasSchema
    .find() // Método para encontrar todas las categorias
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Mostrar una categoria en específico
router.get("/categoria/:id", (req, res) => {
  const { id } = req.params;
  categoriasSchema
    .findById(id) // Encontrar con el id
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Crear categoria
router.post("/categoria", (req, res) => {
  const categoria = categoriasSchema(req.body);
  categoria
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Actualizar categoria
router.put("/categoria/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  categoriasSchema
    .updateOne(
      { _id: id },
      { $set: { nombre }}
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Eliminar categoria
router.delete("/categoria/:id", (req, res) => {
  const { id } = req.params;
  categoriasSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Se exportan las rutas
module.exports = router;
