//Llamada al controlador
const OrderController = require("../controllers/order.controller");

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function (app) {
  app.get("/api/orders/", OrderController.ordersGet);
  app.post("/api/orders/", OrderController.ordersPost);
  app.get("/api/orders/summary", OrderController.orderGetAcumulada);
  app.get("/api/orders/mine", OrderController.orderGetMine);
  app.get("/api/orders/:id", OrderController.orderIdget);
  app.put("/api/orders/:id/deliver", OrderController.orderDeliverPut);
  app.put("/api/orders/:id/pay", OrderController.orderPutPagoOrden);
  app.delete("/api/orders/:id", OrderController.orderDelete);
};
