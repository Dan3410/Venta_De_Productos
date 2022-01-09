const productosModel = require("../models/productosModel");

module.exports = {
  createProduct: function (productData) {
    return new productosModel({
      name: productData.name,
      price: productData.price,
      description: productData.description,
      code: productData.code,
      category: productData.category,
      photo: productData.photo,
    });
  },
};
