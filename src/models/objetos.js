// Se importa la librería mongoose para interactuar con dbs
const mongoose = require("mongoose");

// Se crea el esquema
const objetosSchema = mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  },
});

// Se exporta el esquema
module.exports = mongoose.model("objetos", objetosSchema); // Se entregan como parametros la collección a la que va dirigida y el esquema creado
