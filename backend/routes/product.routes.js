//Llamada al controlador
const ProductController = require("../controllers/product.controller");

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function (app) {
  app.get("/api/products/", ProductController.productGet);
  app.post("/api/products/", ProductController.productpostNew);
  app.put("/api/products/:id", ProductController.productPut);
  app.delete("/api/products/:id", ProductController.productdelete);
  app.post("/api/products/:id/reviews", ProductController.productpost);
  app.get("/api/products/admin", ProductController.productAdminget);
  app.get("/api/products/search", ProductController.productSearchGet);
  app.get("/api/products/categories", ProductController.productCategoriasGet);
  app.get("/api/products/slug/:slug", ProductController.productSlugGet);
  app.get("/api/products/:id", ProductController.productGetId);
};
