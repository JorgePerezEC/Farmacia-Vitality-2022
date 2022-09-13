// config -- model --- controllers --- routes --- server.js

//Llamada de express y el puerto
const express = require("express");
const app = express();
const port = 5000;

const cors = require("cors"); //Solicitud de origen cruzado
const dotenv = require("dotenv"); //Solicitud del archivo de configuración .env (Carga las variables de entorno)
const { Telegraf } = require("telegraf"); //Solicitud de Telegram al ChatBot

const data = require("./backend/data.js");

//Llamada a la configuración .env
dotenv.config();

//Llamada a la configuración de MongoDB
require("./backend/config/mongoose.config");

//Llamada a los middlewares (funciones intermedias)
app.use(cors());
app.use(express.json()); //Utiliza métodos HTTP y obtiene los datos en JSON
app.use(express.urlencoded({ extended: true })); //Obtiene los datos de la URL
//Respuesta a la petición enviada en caso de que no llegue la petición
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//Llamada al bot de Telegram
const bot = new Telegraf(process.env.TELEGRAM_API);
//Mensaje inicial del chatbot
bot.start((ctx) => {
  ctx.reply(
    "Bienvenido al chat de Farmacias Vitality\n\n" +
      "Esta es nuestra lista de productos:\n\n" +
      "1) Cabestrillo Adulto\n" +
      "2) Cabestrillo Infantil\n" +
      "3) Dafilon (sutura tipo Nylon)\n" +
      "4) Estetoscopio\n" +
      "5) Muletas Adulto\n" +
      "6) Mulgatol Jalea 100G\n" +
      "7) Sundown Kids Sundown Naturals Kids Pixar Toy Story 4\n" +
      "8) Oxímetro K&Y digital\n" +
      "9) Scott emulsion multivitamínico infantil 400ml\n" +
      "10) Silla de ruedas plegable\n" +
      "11) Vicryl (sutura)\n\n" +
      "Para mas detalle del producto digite el número de la lista:"
  );
});

bot.help((ctx) => {
  ctx.reply(
    "Bienvenido al asistente de ayuda de Farmacias Vitality\n\n" +
      "Si desea consultar nuestros precios o una ayuda personalizada contacte a los siguientes contactos:\n\n" +
      "Jorge Pérez: +593 984162960\n" +
      "Arnold Iza: +593 979591327\n" +
      "Génesis Cuichan: +593 982587558\n" +
      "Jean Suárez: +593 84239190"
  );
});

//1
bot.hears("1", (ctx) => {
  ctx.replyWithPhoto(data.products[0].image);
  ctx.reply(
    "Nombre: " +
      data.products[0].name +
      "\nPrecio: $" +
      data.products[0].price +
      ",00"
  );
});
bot.hears("1)", (ctx) => {
  ctx.replyWithPhoto(data.products[0].image);
  ctx.reply(
    "Nombre: " +
      data.products[0].name +
      "\nPrecio: $" +
      data.products[0].price +
      ",00"
  );
});
//2
bot.hears("2", (ctx) => {
  ctx.replyWithPhoto(data.products[1].image);
  ctx.reply(
    "Nombre: " +
      data.products[1].name +
      "\nPrecio: $" +
      data.products[1].price +
      ",00"
  );
});
bot.hears("2)", (ctx) => {
  ctx.replyWithPhoto(data.products[1].image);
  ctx.reply(
    "Nombre: " +
      data.products[1].name +
      "\nPrecio: $" +
      data.products[1].price +
      ",00"
  );
});
//3
bot.hears("3", (ctx) => {
  ctx.replyWithPhoto(data.products[2].image);
  ctx.reply(
    "Nombre: " +
      data.products[2].name +
      "\nPrecio: $" +
      data.products[2].price +
      ",00"
  );
});
bot.hears("3)", (ctx) => {
  ctx.replyWithPhoto(data.products[2].image);
  ctx.reply(
    "Nombre: " +
      data.products[2].name +
      "\nPrecio: $" +
      data.products[2].price +
      ",00"
  );
});
//4
bot.hears("4", (ctx) => {
  ctx.replyWithPhoto(data.products[3].image);
  ctx.reply(
    "Nombre: " +
      data.products[3].name +
      "\nPrecio: $" +
      data.products[3].price +
      ",00"
  );
});
bot.hears("4)", (ctx) => {
  ctx.replyWithPhoto(data.products[3].image);
  ctx.reply(
    "Nombre: " +
      data.products[3].name +
      "\nPrecio: $" +
      data.products[3].price +
      ",00"
  );
});
//5
bot.hears("5", (ctx) => {
  ctx.replyWithPhoto(data.products[4].image);
  ctx.reply(
    "Nombre: " +
      data.products[4].name +
      "\nPrecio: $" +
      data.products[4].price +
      ",00"
  );
});
bot.hears("5)", (ctx) => {
  ctx.replyWithPhoto(data.products[4].image);
  ctx.reply(
    "Nombre: " +
      data.products[4].name +
      "\nPrecio: $" +
      data.products[4].price +
      ",00"
  );
});
//6
bot.hears("6", (ctx) => {
  ctx.replyWithPhoto(data.products[5].image);
  ctx.reply(
    "Nombre: " +
      data.products[5].name +
      "\nPrecio: $" +
      data.products[5].price +
      ",00"
  );
});
bot.hears("6)", (ctx) => {
  ctx.replyWithPhoto(data.products[5].image);
  ctx.reply(
    "Nombre: " +
      data.products[5].name +
      "\nPrecio: $" +
      data.products[5].price +
      ",00"
  );
});
//7
bot.hears("7", (ctx) => {
  ctx.replyWithPhoto(data.products[6].image);
  ctx.reply(
    "Nombre: " +
      data.products[6].name +
      "\nPrecio: $" +
      data.products[6].price +
      ",00"
  );
});
bot.hears("7)", (ctx) => {
  ctx.replyWithPhoto(data.products[6].image);
  ctx.reply(
    "Nombre: " +
      data.products[6].name +
      "\nPrecio: $" +
      data.products[6].price +
      ",00"
  );
});
//8
bot.hears("8", (ctx) => {
  ctx.replyWithPhoto(data.products[7].image);
  ctx.reply(
    "Nombre: " +
      data.products[7].name +
      "\nPrecio: $" +
      data.products[7].price +
      ",00"
  );
});
bot.hears("8)", (ctx) => {
  ctx.replyWithPhoto(data.products[7].image);
  ctx.reply(
    "Nombre: " +
      data.products[7].name +
      "\nPrecio: $" +
      data.products[7].price +
      ",00"
  );
});
//9
bot.hears("9", (ctx) => {
  ctx.replyWithPhoto(data.products[8].image);
  ctx.reply(
    "Nombre: " +
      data.products[8].name +
      "\nPrecio: $" +
      data.products[8].price +
      ",00"
  );
});
bot.hears("9)", (ctx) => {
  ctx.replyWithPhoto(data.products[8].image);
  ctx.reply(
    "Nombre: " +
      data.products[8].name +
      "\nPrecio: $" +
      data.products[8].price +
      ",00"
  );
});
//10
bot.hears("10", (ctx) => {
  ctx.replyWithPhoto(data.products[9].image);
  ctx.reply(
    "Nombre: " +
      data.products[9].name +
      "\nPrecio: $" +
      data.products[9].price +
      ",00"
  );
});
bot.hears("10)", (ctx) => {
  ctx.replyWithPhoto(data.products[9].image);
  ctx.reply(
    "Nombre: " +
      data.products[9].name +
      "\nPrecio: $" +
      data.products[9].price +
      ",00"
  );
});

//11
bot.hears("11", (ctx) => {
  ctx.replyWithPhoto(data.products[10].image);
  ctx.reply(
    "Nombre: " +
      data.products[10].name +
      "\nPrecio: $" +
      data.products[10].price +
      ",00"
  );
});
bot.hears("11)", (ctx) => {
  ctx.replyWithPhoto(data.products[10].image);
  ctx.reply(
    "Nombre: " +
      data.products[10].name +
      "\nPrecio: $" +
      data.products[10].price +
      ",00"
  );
});

bot.launch();

//Llamada a las rutas
const orderRoutes = require("./backend/routes/order.routes");
orderRoutes(app); //Envía los datos a team.routes
const userRoutes = require("./backend/routes/user.routes");
userRoutes(app); //Envía los datos a team.routes
const productRoutes = require("./backend/routes/product.routes");
productRoutes(app); //Envía los datos a team.routes
const seedRoutes = require("./backend/routes/seed.routes");
seedRoutes(app); //Envía los datos a team.routes
const uploadRoutes = require("./backend/routes/upload.routes");
uploadRoutes(app); //Envía los datos a team.routes

//Establecimiento del puerto
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto", port);
});

console.log("Establecido el ChatBot de Telegram");
