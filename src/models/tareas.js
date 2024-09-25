// Se importa la librería mongoose para interactuar con dbs
const mongoose = require("mongoose");

// Se crea el esquema
const tareasSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  prioridad: {
    type: String,
    required: true,
    enum: ["Alta", "Media", "Baja"],
  },
  estado: {
    type: String,
    required: true,
    enum: ["Pendiente", "En progreso", "Completada"],
  },
});

// Se exporta el esquema
module.exports = mongoose.model("tareas", tareasSchema); // Se entregan como parametros la collección a la que va dirigida y el esquema creado
