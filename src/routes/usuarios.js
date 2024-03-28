const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const usuariosSchema = require("../models/usuarios");

// Mostrar todos los usuarios
router.get("/mostrarUsuarios", (req, res) => {
  usuariosSchema
    .find() // Método para encontrar todos los usuarios
    .then((data) => res.json(data)) // Después se responde con los datos encontrados
    .catch((error) => res.json({ mensaje: error })); // Si no se encuentran se responde con un error
});

// Mostrar usuario
router.get("/mostrarUsuario/:id", (req, res) => {
  const { id } = req.params; // Se extrae el id desde los parametros
  usuariosSchema
    .findById(id) // Encontrar dato con un id
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Crear usuario
router.post("/crearUsuario", (req, res) => {
  const usuario = usuariosSchema(req.body); // Se crea el usuario con el esquema preestablecido
  usuario
    .save() // Se guarda el usuario en la base de datos
    .then((data) => res.json(data)) // Después se responde con los datos guardados
    .catch((error) => res.json({ mensaje: error })); // Si no se logra guardar se responde con un error
});

// Actualizar usuario
router.put("/actualizarUsuario/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, numeroDocumento, correoElectronico, genero } =
    req.body; // Se extraen los campos desde el cuerpo del esquema
  usuariosSchema
    .updateOne(
      { _id: id },
      {
        $set: { nombre, apellidos, numeroDocumento, correoElectronico, genero },
      }
    ) // Al método de actualizar se le pasan dos parametros, el id y los campos que se van a cambiar
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Eliminar usuario
router.delete("/eliminarUsuario/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .deleteOne({ _id: id }) // Al método de eliminar se le pasa un objeto con el id
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

// Se exportan las rutas
module.exports = router;
