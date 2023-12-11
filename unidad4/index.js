// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

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
const reeveCollection = require("./models/reeve");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Inicializamos la aplicación
const app = express();

//  Indicamos que la aplicación puede escribir JSON (API Rest)
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegando en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
dataBase();

//EXAMEN

/*let reeve = [
{
    "origen": "C/feo nº2",
    "destino": "C/ locos Nº4",
    "numero de paradas": "4",

    "tanetes": [
        {
            "hora": "12:00",
            "cantidad": "5"
        },
        {
             "hora": "14:00",
            "cantidad": "5"
        },
        {
            "hora": "16:00",
            "cantidad": "6"
        },
        {
            "hora": "12:00",
            "cantidad": "9"
        }
    ]
  } */

//EXAMEN

//lista todos los reeve
app.get("/reeve", (request, response) => {
  reeveCollection
    .find()
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Añadir un nuevo reeve
app.post("/reeve", (request, response) => {
  const reeve = reeveCollection(request.body);
  reeve
    .save()
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Obtener un solo reeve
app.get("/reeve/:id", (request, response) => {
  const id = request.params.id;
  reeveCollection
    .findById(id)
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Actualizar un solo reeve
app.put("/reeve/:id", (request, response) => {
  const id = request.params.id;
  const { origen, destino, numeroParadas, tanetes } = request.body;
  reeveCollection
    .updateOne({ _id: id }, { $set: { origen, destino, numeroParadas, tanetes } })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Borrar un elemento del array
app.delete("/reeve/:id", (request, response) => {
  const id = request.params.id;
  reeveCollection
    .deleteOne({ _id: id })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Obtener todos los tanetes de un concesionarios por id
app.get("/reeve/:id/tanetes", (request, response) => {
  const id = request.params.id;

  reeveCollection
    .findById(id)
    .then((reeve) => {
      response.json({ tanetes: reeve.tanetes });
    })
    .catch((error) => response.json({ message: error }));
});

// Añadir un nuevo tanete al concesionario
app.post("/reeve/:id/tanetes", (request, response) => {
  const id = request.params.id;
  const { hora, cantidad } = request.body;

  reeveCollection
    .findById(id)
    .then((reeve) => {
      if (!reeve) {
        return response.status(404).json({ message: "Reeve no encontrado" });
      }

      // Agregar el nuevo tanete al array existente
      const nuevoTanete = { hora, cantidad };
      reeve.tanetes.push(nuevoTanete);

      return reeve.save();
    })
    .then((data) => response.json(data))
    .catch((error) => response.status(500).json({ message: error }));
});

// Obtener el tanete cuyo id sea taneteId, del reeve pasado por id
app.get("/reeve/:id/tanetes/:taneteId", (request, response) => {
  const id = request.params.id;
  const taneteId = request.params.taneteId;

  reeveCollection
    .findById(id)
    .then((reeve) => {
      if (!reeve) {
        return response.status(404).json({ message: "Reeve no encontrado" });
      }

      const tanete = reeve.tanetes[taneteId];
      response.json({ tanete });
    })
    .catch((error) => response.json({ message: error }));
});

// Actualizar el tanete cuyo id sea taneteId, del reeve pasado por id
app.put("/reeve/:id/tanetes/:cocheId", (request, response) => {
  const id = request.params.id;
  const taneteId = request.params.taneteId;
  const { hora, cantidad } = request.body;

  reeveCollection
    .findById(id)
    .then((reeve) => {
      if (!reeve) {
        return response.status(404).json({ message: "Reeve no encontrado" });
      }

      // Actualizar los datos del coche en el array existente
      concesionario.tanetes[taneteId] = { hora, cantidad };

      // Actualizar la propiedad 'tanetes' con el array modificado
      return reeve.save();
    })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Borrar el tanete cuyo id sea taneteId, del reeve pasado por id
app.delete("/reeve/:id/tanetes/:taneteId", (request, response) => {
  const id = request.params.id;
  const taneteId = request.params.taneteId;

  reeveCollection
    .findById(id)
    .then((reeve) => {
      if (!reeve) {
        return response.status(404).json({ message: "Reeve no encontrado" });
      }

      // Verificar si el índice es válido
      if (taneteId < 0 || taneteId >= reeve.tanetes.length) {
        return response.status(400).json({ message: "Índice de tanete no válido" });
      }

      // Eliminar el tanete específico del array
      reeve.tanete.splice(taneteId, 1);

      // Actualizar la propiedad 'tanetes' con el array modificado
      return reeve.save();
    })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});
