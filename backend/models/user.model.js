//Importación de MongoDB
const mongoose = require("mongoose");

//Esquema para los Usuarios
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de usuario es requerido"],
    },
    email: {
      type: String,
      required: [true, "Se requiere una dirección de email"],
      unique: true,
    },
    password: { type: String, required: [true, "Ingrese una contraseña"] },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

//Definición del modelo
const User = mongoose.model("User", userSchema);
module.exports = User;
