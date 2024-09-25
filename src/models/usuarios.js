// Se importa la librería de Mongo, para interactuar con la db
const mongoose = require("mongoose");

// Se crea el esquema
const usuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
});

// Se exporta el esquema
module.exports = mongoose.model("usuarios", usuariosSchema); // Se entregan como parametros la collección a la que va dirigida y el esquema creado
