//Importamos las bibliotecas necesarias
//Concretamente el framework express
const express = require("express");

//Inicializamos la aplicacion
const app = express();

//Indicamos que la aplicacion puede recibir JSON (API REST)
app.use(express.json());

//Indicamos el puerto que vamos a desplegar la aplicacion
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Servidor de desplegado en puerto: ${port}`);
});

const coches = [
  { marca: "Renault", modelo: "Clio" },
  { marca: "Nissan", modelo: "Skyline R34" },
];

//Listar los coches
app.get("/coches", (request, response) => {
  response.json(coches);
});

//Añadir un nuevo coche
app.post("/coches", (request, response) => {
  console.log(request.body);
  response.json({ message: "ok" });
});
