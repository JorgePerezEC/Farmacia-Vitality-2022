//Llamada del módulo Utils (Creación y generación de Tokens)
const utils = require("../utils.js");

//Llamada del módulo Streamifier (Carga y subida de datos a Azure)
const streamifier = require("streamifier");

//Llamada del módulo Cloudinary (Carga y subida de información a la nube)
const cloudinary = require("cloudinary");

//Llamada a Multer (Middleware que permite la carga de archivos a la App)
const multer = require("multer");

//Carga de la librería multer
const upload = multer();

//Respuesta a la Actualización -- "/",
module.exports.uploadPost =
  (utils.isAuth,
  utils.isAdmin,
  upload.single("file"),
  async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.send(result);
  });
