const mongoose = require("mongoose");

const concesionarioColletion = mongoose.Schema({
  nombre: { type: String },
  direccion: { type: String },
  coches: { type: String },
});

//Creamos un modelo
const concesionarios = mongoose.model("Concesionarios", concesionarioColletion);
module.exports = concesionarios;
