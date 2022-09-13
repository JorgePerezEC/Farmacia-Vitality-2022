//Importación de MongoDB
const mongoose = require("mongoose");

//Esquema para la revisión del producto
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

//Esquema para los productos
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor, ingrese un nombre para el producto"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Por favor, ingrese un slug"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Por favor, ingrese la URL de la imagen"],
    },
    images: [String],
    brand: {
      type: String,
      required: [true, "Por favor, ingrese la marca del producto"],
    },
    category: {
      type: String,
      required: [true, "Por favor, ingrese la categoría del producto"],
    },
    description: {
      type: String,
      required: [true, "Por favor, ingrese una descripción del producto"],
    },
    price: {
      type: Number,
      required: [true, "Por favor, ingrese el precio del producto"],
    },
    countInStock: {
      type: Number,
      required: [true, "Por favor, ingrese el stock del producto"],
    },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

//Definición del modelo
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
