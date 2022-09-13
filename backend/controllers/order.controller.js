//Obtención del modelo
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

//Importación de express-async-handler (Middleware para manejar controladores de manera asíncrona)
const expressAsyncHandler = require("express-async-handler");

//Llamada del módulo Utils (Creación y generación de Tokens)
const utils = require("../utils.js");

//Petición de la orden -- "/"
module.exports.ordersGet =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user", "name");
    res.send(orders);
  }));

//Respuesta de la orden -- "api/orders",
module.exports.ordersPost =
  (utils.isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: "Nueva Orden Creada", order });
  }));

//Petición de la Orden Acumulada -- "/summary",
module.exports.orderGetAcumulada =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    //Agregar Orden
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    //Agregar Usuario
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    //Agregar pedidos diarios
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    //Agregar categorías de Productos
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  }));

//Petición de la Orden propia -- "/mine",
module.exports.orderGetMine =
  (utils.isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: User._id });
    res.send(orders);
  }));

//Petición de la orden del Usuario -- "/:id",
module.exports.orderIdget =
  (utils.isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Orden No Encontrada" });
    }
  }));

//Obtención de la orden del Usuario -- "/:id/deliver",
module.exports.orderDeliverPut =
  (utils.isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: "Orden Entregada" });
    } else {
      res.status(404).send({ message: "Orden No Encontrada" });
    }
  }));

//Obtención de la orden de pago del usuario --  "/:id/pay",
module.exports.orderPutPagoOrden =
  (utils.isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "email name"
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();

      utils
        .mailgun()
        .messages()
        .send(
          {
            from: "Farmacia Vitality <far_vitality@mg.yourdomain.com>",
            to: `${order.user.name} <${order.user.email}>`,
            subject: `Nueva orden ${order._id}`,
            html: utils.payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );

      res.send({ message: "Orden Pagada", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Orden No Encontrada" });
    }
  }));

//Borrar Orden del Usuario -- "/:id",
module.exports.orderDelete =
  (utils.isAuth,
  utils.isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.send({ message: "Orden Borrada" });
    } else {
      res.status(404).send({ message: "Orden No Encontrada" });
    }
  }));