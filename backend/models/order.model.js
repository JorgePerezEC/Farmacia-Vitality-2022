//Importación de MongoDB
const mongoose = require("mongoose");

//Creación del esquema Orden
const orderSchema = new mongoose.Schema(
  {
    //Datos para el orden de Items
    orderItems: [
      {
        slug: { type: String, required: [true, "Por favor, ingrese un slug"] },
        name: {
          type: String,
          required: [true, "Por favor, ingrese el nombre de la orden"],
        },
        quantity: {
          type: Number,
          required: [true, "Por favor, ingrese la cantidad de la orden"],
        },
        image: {
          type: String,
          required: [true, "Por favor, ingrese la imagen  del producto"],
        },
        price: {
          type: Number,
          required: [true, "Por favor, ingrese el precio de la orden"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    //Datos para la información de envio
    shippingAddress: {
      fullName: { type: String, required: true },
      address: {
        type: String,
        required: [true, "Por favor, ingrese una dirección de envío"],
      },
      city: { type: String, required: [true, "Por favor, ingrese una ciudad"] },
      postalCode: {
        type: String,
        required: [true, "Por favor, ingrese el código postal"],
      },
      country: { type: String, required: [true, "Por favor, ingrese el país"] },
      location: {
        lat: Number,
        lng: Number,
        address: String,
        name: String,
        vicinity: String,
        googleAddressId: String,
      },
    },
    //Datos para el pago
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    //Datos para el precio
    itemsPrice: {
      type: Number,
      required: [true, "Por favor, ingrese el precio del producto"],
    },
    shippingPrice: {
      type: Number,
      required: [true, "Por favor, ingrese el precio del envío"],
    },
    taxPrice: {
      type: Number,
      required: [true, "Por favor, ingrese el valor del impuesto"],
    },
    totalPrice: { type: Number, required: true },
    //user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    //user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    //Datos para el tiempo
    timestamps: true,
  }
);

//Definición del modelo
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
