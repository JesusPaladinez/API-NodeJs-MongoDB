const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const productosSchema = require("../models/productos");


// Pasar multer como argumento
module.exports = (upload) => {
  // Mostrar todos los productos
  router.get("/producto", (req, res) => {
    productosSchema
      .find() // Método para encontrar todos los productos
      .then((data) => res.json(data))
      .catch((error) => res.json({ mensaje: error }));
  });

  // Mostrar producto
  router.get("/producto/:id", (req, res) => {
    const { id } = req.params;
    productosSchema
      .findById(id) // Encontrar producto con un id
      .then((data) => res.json(data))
      .catch((error) => res.json({ mensaje: error }));
  });

  // Crear producto
  router.post("/producto", upload.single("imagen"), (req, res) => {
    const { nombre, precio } = req.body;

    if (!req.file) {
      return res.status(400).json({
        mensaje: "La imagen es requerida.",
      });
    }

    const imagen = req.file.filename;

    const producto = new productosSchema({ nombre, precio, imagen });
    producto
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ mensaje: error.message }));
  });

  // Actualizar producto
  router.put("/producto/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, precio, imagen } = req.body;
    productosSchema
      .updateOne({ _id: id }, { $set: { nombre, precio, imagen } })
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ mensaje: error.message }));
  });

  // Eliminar producto
  router.delete("/producto/:id", (req, res) => {
    const { id } = req.params;
    productosSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ mensaje: error }));
  });

  // Se exportan las rutas
  module.exports = router;
}
