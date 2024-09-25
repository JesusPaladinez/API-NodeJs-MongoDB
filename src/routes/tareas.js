const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const tareasSchema = require("../models/tareas");

// Pasar multer como argumento
module.exports = (upload) => {
  // Mostrar todos los tareas
  router.get("/tareas", (req, res) => {
    tareasSchema
      .find() // Método para encontrar todos los tareas
      .then((data) => res.json(data))
      .catch((error) => res.json({ mensaje: error }));
  });

  // Mostrar tarea
  router.get("/tareas/:id", (req, res) => {
    const { id } = req.params;
    tareasSchema
      .findById(id) // Encontrar tarea con un id
      .then((data) => res.json(data))
      .catch((error) => res.json({ mensaje: error }));
  });

  // Crear tarea
  router.post("/tareas", upload.single("imagen"), (req, res) => {
    const { nombre, descripcion } = req.body;

    const tarea = new tareasSchema({ nombre, descripcion });
    tarea
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ mensaje: error.message }));
  });

  // Actualizar tarea
  router.put("/tareas/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    tareasSchema
      .updateOne({ _id: id }, { $set: { nombre, descripcion } })
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ mensaje: error.message }));
  });

  // Eliminar tarea
  router.delete("/tareas/:id", (req, res) => {
    const { id } = req.params;
    tareasSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ mensaje: error }));
  });

  // Devolver el enrutador configurado
  return router;
};
