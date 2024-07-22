// El framework express sirve para crear servidores y manejar rutas
const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const fichasSchema = require("../models/fichas");

// Mostrar todas las fichas
router.get("/ficha", (req, res) => {
    fichasSchema
    .find() // Método para encontrar todas las fichas
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// Mostrar una ficha en específico
router.get("/ficha/:id", (req, res) => {
  const { id } = req.params;
  fichasSchema
    .findById(id) // Encontrar con el id
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Crear ficha
router.post("/ficha", (req, res) => {
  const ficha = fichasSchema(req.body);
  ficha
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Actualizar ficha
router.put("/ficha/:id", (req, res) => {
  const { id } = req.params;
  const {
    numeroFicha,
    aprendicesActuales,
    aprendicesMatriculados,
    jornada,
    tipoFormacion,
  } = req.body;
  fichasSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          numeroFicha,
          aprendicesActuales,
          aprendicesMatriculados,
          jornada,
          tipoFormacion,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Eliminar ficha
router.delete("/ficha/:id", (req, res) => {
  const { id } = req.params;
  fichasSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Se exportan las rutas
module.exports = router;
