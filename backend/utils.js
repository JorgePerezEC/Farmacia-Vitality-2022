//Importación para la creación de tokens por medio del archivo JSON
const jwt = require("jsonwebtoken");

//Importación para el uso de correo electrónico
const mg = require("mailgun-js"); 

//Componente Funcional para la Generación del Token
module.exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

//Función que autoriza la conexión del Token
module.exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  //Si se autoriza el token
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      //Excepciones
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

//Función que autoriza el Token para el Administrador
module.exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

//Función que genera el mail
module.exports.mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });
