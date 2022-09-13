//Obtención del modelo
const Product = require("../models/product.model");
const User = require("../models/user.model.js");

//Llamada a la data inicial
const data = require("../data.js");

//Petición Seed para cargar los datos iniciales a la Base de Datos  "/",
module.exports.seedGet = async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
};
