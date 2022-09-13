//Llamada al controlador
const UserController = require("../controllers/user.controller");

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function (app) {
  app.get("/api/users", UserController.usersGet);
  app.get("/api/users/:id", UserController.getUsuario);
  app.put("/api/users/:id", UserController.putUser);
  app.delete("/api/users/:id", UserController.deleteUser);
  app.post("/api/users/signin", UserController.postLogin);
  app.post("/api/users/signup", UserController.postNewUser);
  app.get("/api/users/profile", UserController.VerUser);
  app.get("/api/users/all", UserController.getAllUsers);
};
