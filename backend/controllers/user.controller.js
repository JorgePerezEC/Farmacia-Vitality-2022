//Obtención del modelo
const User = require("../models/user.model");

//Importación de express-async-handler (Middleware para manejar controladores de manera asíncrona)
const expressAsyncHandler = require("express-async-handler");

//Llamada del módulo Utils (Creación y generación de Tokens)
const utils = require("../utils.js");

//Importación de Bcrypt (Encriptación de contraseñas)
const bcrypt = require("bcryptjs");

//Creación de usuario --  "/",
module.exports.usersGet=(
  utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

//Petición del Usuario por ID /:id
module.exports.getUsuario =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Usuario no registrado" });
    }
  }));

//Obtención del Usuario por ID -- "/:id"
module.exports.putUser =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: "Usuario actualizado", user: updatedUser });
    } else {
      res.status(404).send({ message: "Usuario no registrado " });
    }
  }));

//Eliminación del Usuario por ID -- "/:id"
module.exports.deleteUser =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res
          .status(400)
          .send({ message: "No de puede eliminar el usuario Administrados" });
        return;
      }
      await user.remove();
      res.send({ message: "Usuario eliminado" });
    } else {
      res.status(404).send({ message: "Usuario no registrado" });
    }
  }));

//Respuesta del Usuario al ingresar al login -- "/signin"
module.exports.postLogin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({email: req.body.email });
  if (user) {
    if (req.body.password === user.password) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: utils.generateToken(user),
      });
      res.send({ message: "Usuario correcto" });
      return;
    }
  }
  res
    .status(401)
    .send({ message: "Contraseña o correo electrónico incorrecto" });
});

//Respuesta del Usuario al crear un nuevo usuario -- "/signup"
module.exports.postNewUser = expressAsyncHandler(async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: utils.generateToken(user),
  });
});

//Visualizacion de todos los usuarios
module.exports.getAllUsers =
  (utils.isAuth,
  expressAsyncHandler(async (_, response) => {
    User.find({})
      .then((user) => response.json(user))
      .catch((err) => response.json(err));
  }));

//Obtención del perfil de Usuario /profile
module.exports.VerUser =
  (utils.isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: utils.generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "Usuario no registrado" });
    }
  }));
