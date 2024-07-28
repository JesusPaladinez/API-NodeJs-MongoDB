// Se importan los módulos
const express = require("express"); // El framework express sirve para crear servidores y manejar rutas
const mongoose = require("mongoose"); // El módulo mongoose sirve para interactuar con dbs
const cors = require("cors"); // Permite las solicitudes CORS
require("dotenv").config(); // Se cargan las variables de entorno definidas en el archivo .env

// Se importan las rutas
const rutasUsuarios = require("./routes/usuarios");
const rutasFichas = require("./routes/fichas");
const rutasObjetos = require("./routes/objetos");

const app = express();

app.use(cors()); 

const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use("/api", rutasUsuarios);
app.use("/api", rutasFichas);
app.use("/api", rutasObjetos);

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido a la aplicación del proyecto de Reconocimiento Facial");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((error) => console.error("Error al conectar a MongoDB.", error));

// Conexión con el servidor
app.listen(port, () =>
  console.log("El servidor está escuchando en el puerto", port)
);
