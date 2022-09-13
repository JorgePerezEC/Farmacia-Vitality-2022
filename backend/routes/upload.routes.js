//Llamada al controlador
const UploadController = require("../controllers/upload.controller");

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function (app) {
  app.post("/api/upload", UploadController.uploadPost);
};
