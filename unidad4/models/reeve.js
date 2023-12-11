const mongoose = require("mongoose");

//Creamos la coleccion para los reeve
const reeveCollection = mongoose.Schema({
  origen: { type: String },
  destino: { type: String },
  numeroParadas: { type: String },
  tanetes: [
    {
      hora: { type: String },
      cantidad: { type: String },
    },
  ],
});

//Creamos un modelo para el examenn
const reeve = mongoose.model("Reeve", reeveCollection);
module.exports = reeve;
