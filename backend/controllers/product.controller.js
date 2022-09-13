//Obtención del modelo
const Product = require("../models/product.model");
const User = require("../models/user.model");

//Importación de express-async-handler (Middleware para manejar controladores de manera asíncrona)
const expressAsyncHandler = require("express-async-handler");

//Llamada del módulo Utils (Creación y generación de Tokens)
const utils = require("../utils.js");

//Petición del Producto -- "api/product"
module.exports.productGet = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

//Creación del Producto -- "/"
module.exports.productpostNew =
  (utils.isAuth,
  utils.isAdmin,
  (req, res) => {
    const newProduct = new Product({
      name: "sample name " + Date.now(),
      slug: "sample-name-" + Date.now(),
      image: "/images/cabestrillo_adulto.png",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    Product.create(newProduct)
      .then((product) =>
        res.json({ insertedProduct: product, msg: "Producto creado" })
      )
      .catch((err) => res.status(400).json(err));
  });

//Obtención del Producto de acuerdo al ID "/:id"
module.exports.productPut =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: "Producto actualizado" });
    } else {
      res.status(404).send({ message: "Producto no encontrado" });
    }
  }));

//Borrar Producto de acuerdo al ID -- "/:id"
module.exports.productdelete =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Producto eliminado" });
    } else {
      res.status(404).send({ message: "Producto no encontrado" });
    }
  }));

//Respuesta del Producto de acuerdo al ID "/:id/reviews"
module.exports.productpost =
  (utils.isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "Ya enviaste una calificación" });
      }

      const review = {
        name: User.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review); //Añade un elemento al array
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Calificación creada",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "Producto no encontrado ..!!" });
    }
  }));

const PAGE_SIZE = 3; //Tamaño de la página

//Petición del Producto -- "/admin"
module.exports.productAdminget =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1)) //Omite consultas anteriores
      .limit(pageSize); //Cantidad máxima de páginas
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize), //Operación matemática para las páginas
    });
  }));

//Realiza una búsqueda del Producto -- "/search"
module.exports.productSearchGet = expressAsyncHandler(async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== "all"
      ? {
          // 1-50
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});

//Obtiene el producto por categorías -- "/categories"
module.exports.productCategoriasGet = expressAsyncHandler(async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
});

//Obtiene el producto por slug -- "/slug/:slug",
module.exports.productSlugGet = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Producto no encontrado" });
  }
};

//Obtiene el producto por ID -- "/:id",
module.exports.productGetId = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Producto no encontrado" });
  }
};
