//Creamos la base de datos y la conectamos
const mongoose = require("mongoose");

const dataBase = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect("mongodb://127.0.0.1:27017/reeve", {});
    console.log("Conexion correcta");
  } catch (err) {
    console.error("Error de conexion:", err);
  }
};

module.exports = dataBase;
