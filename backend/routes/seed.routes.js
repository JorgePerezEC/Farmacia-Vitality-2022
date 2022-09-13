//Llamada al controlador
const SeedController = require("../controllers/seed.controller");

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function (app) {
  app.get("/api/seed", SeedController.seedGet);
};
