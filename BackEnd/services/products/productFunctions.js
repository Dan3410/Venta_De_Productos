const productModel = require("../../utils/models/productModel");

module.exports = {
  createProduct: function (productData) {
    return new productModel({
      name: productData.name,
      price: productData.price,
      description: productData.description,
      code: productData.code,
      category: productData.category,
      photo: productData.photo,
    });
  },
};
