// Se importa la librería de Mongo, para interactuar con la db
const mongoose = require("mongoose")

// Se crea el esquema
const fichasSchema = mongoose.Schema ({
    numeroFicha: {
        type: String,
        required: true
    },
    aprendicesActuales: {
        type: Number,
        required: true
    },
    aprendicesMatriculados: {
        type: Number,
        required: true
    },
    jornada: {
        type: String,
        required: true
    },
    tipoFormacion: {
        type: String,
        required: true
    },
})

// Se exporta el esquema
module.exports = mongoose.model("fichas", fichasSchema) // Se entregan como parametros la collección a la que va dirigida y el esquema creado