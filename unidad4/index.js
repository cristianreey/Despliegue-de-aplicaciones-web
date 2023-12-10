<<<<<<< HEAD
// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

=======
/**
 * Tres formsa ed almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");
const mongoose = require("mongoose");

const dataBase = require("./dataBase");
const concesionarioColletion = require("./models/concesionarios");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
>>>>>>> 7ed4525552fae0139cc2fac5e2485927f2bca4c2

// Inicializamos la aplicación
const app = express();

<<<<<<< HEAD

=======
>>>>>>> 7ed4525552fae0139cc2fac5e2485927f2bca4c2
//  Indicamos que la aplicación puede escribir JSON (API Rest)
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

<<<<<<< HEAD

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;


=======
// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

>>>>>>> 7ed4525552fae0139cc2fac5e2485927f2bca4c2
// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegando en puerto: ${port}`);
});

<<<<<<< HEAD

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let concesionarios = [
  {
    nombre: "Malaga Motor",
    direccion: "C/ pepe garcia Nº4",
    coches: "Seat Cordoba, Cupra FR, Seat Ibiza, AUDI A7",
  },
  {
    nombre: "Hyundai Motor",
    direccion: "Calle San Fernando 14",
    coches: "BMW M5 Competicion, Nissan Gtr R34, Mercedes AMG",
  },
];


// Lista todos los concesionarios
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});


// Añadir un nuevo concesionarios
app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "ok" });
=======
// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
dataBase();
/**let concesionarios = [
  {
    "nombre": "Hyunday Motor",
    "direccion": "C/ locos Nº4",
    "coches": "Toyota Camry, Ford Mustang ,BMW X5, Honda Civic"
  },
  {
    "nombre": "Malaga Motor",
    "direccion": "Calle Pepito 14 Poligono Industrial Malaga",
    "coches": "Tesla Model, Audi Q5, Ford F-150, Mercedes-Benz E-Class"
  },
];*/

// Lista todos los concesionarios
app.get("/concesionarios", (request, response) => {
  concesionarioColletion
    .find()
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Añadir un nuevo concesionarios
app.post("/concesionarios", (request, response) => {
  const concesionario = concesionarioColletion(request.body);
  concesionario
    .save()
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Obtener un solo concesionarios
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarioColletion
    .findById(id)
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Actualizar un solo concesionarios
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const { nombre, direccion, coches } = request.body;
  concesionarioColletion
    .updateOne({ _id: id }, { $set: { nombre, direccion, coches } })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Borrar un elemento del array
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarioColletion
    .deleteOne({ _id: id })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Obtener todos los coches de un concesionarios por id
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;

  concesionarioColletion
    .findById(id)
    .then((concesionario) => {
      response.json({ coches: concesionario.coches });
    })
    .catch((error) => response.json({ message: error }));
});

// Añadir un nuevo coche al concesionario
app.post("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const { coches: cochesToAdd } = request.body;

  concesionarioColletion
    .findById(id)
    .then((concesionario) => {
      if (!concesionario) {
        return response.status(404).json({ message: "Concesionario no encontrado" });
      }

      // Convertir la cadena de coches existente a un array
      const cochesArray = concesionario.coches.split(",").map((coche) => coche.trim());

      // Agregar los nuevos coches al array existente
      cochesArray.push(...cochesToAdd.split(","));

      // Convertir el array de coches de nuevo a una cadena
      concesionario.coches = cochesArray.join(", ");

      return concesionario.save();
    })
    .then((data) => response.json(data))
    .catch((error) => response.status(500).json({ message: error }));
});

// Obtener el coche cuyo id sea cocheId, del concesionario pasado por id
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;

  concesionarioColletion
    .findById(id)
    .then((concesionario) => {
      const cochesArray = concesionario.coches.split(",").map((coche) => coche.trim());

      const coche = cochesArray[cocheId];
      response.json({ coche });
    })
    .catch((error) => response.json({ message: error }));
});

// Actualizar el coche cuyo id sea cocheId, del concesionario pasado por id
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  const { coches } = request.body;

  concesionarioColletion
    .findById(id)
    .then((concesionario) => {
      const cochesArray = concesionario.coches.split(",").map((coche) => coche.trim());
      cochesArray[cocheId] = coches;

      // Actualizar la propiedad 'coches' con el array modificado
      concesionario.coches = cochesArray.join(", ");

      return concesionario.save();
    })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Borrar el coche cuyo id sea cocheId, del concesionario pasado por id
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;

  concesionarioColletion
    .findById(id)
    .then((concesionario) => {
      const cochesArray = concesionario.coches.split(",").map((coche) => coche.trim());

      // Eliminar el coche específico del array
      cochesArray.splice(cocheId, 1);

      // Actualizar la propiedad 'coches' con el array modificado
      concesionario.coches = cochesArray.join(", ");

      return concesionario.save();
    })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
>>>>>>> 7ed4525552fae0139cc2fac5e2485927f2bca4c2
});


// Obtener un solo concesionarios
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({ result });
});


// Actualizar un solo concesionarios
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios[id] = request.body;
  response.json({ message: "ok" });
});


// Borrar un elemento del array
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios = concesionarios.filter((item, index) => index != id);
  response.json({ message: "ok" });
});


// Obtener todos los coches de un concesionarios por id
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];


  const result = concesionarioConcreto.coches.split(",").map((coches) => coches.trim());
  response.json({ result });
});


// Añadir un nuevo coche al concesionarios
app.post("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];


  concesionarioConcreto.coches += `, ${request.body.coches}`;
  response.json({ message: "ok" });
});


// Obtiene el coche cuyo id sea cocheId, del concesionarios pasado por id
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];


  const cocheId = request.params.cocheId;
  const coches = concesionarioConcreto.coches.split(",").map((coches) => coches.trim());


  const result = coches[cocheId];


  response.json({ result });
});


// Actualiza el coche cuyo id sea cocheId, del concesionarios pasado por id
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];


  const cocheId = request.params.cocheId;
  const coches = concesionarioConcreto.coches.split(",").map((coches) => coches.trim());


  coches[cocheId] = request.body.coches;
  concesionarioConcreto.coches = coches.join(", ");


  response.json({ message: "ok" });
});


// Borra el coche cuyo id sea cocheId, del concesionarios pasado por id
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];


