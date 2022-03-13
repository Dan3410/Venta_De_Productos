const productModel = require("../../utils/models/productModel");
const productFunctions = require("./productFunctions");

module.exports = {
  getAllProductsService: async function () {
    return await productModel.find().populate("");
  },

  getProductWithIdService: async function (id) {
    await productModel.findById({ _id: id }).select({
      name: 1,
      price: 1,
      code: 1,
      description: 1,
      category: 1,
      photo: 1,
    });
  },

  createProductService: async function (productData) {
    const producto = productFunctions.createProduct(productData);
    return await producto.save();
  },

  updateProductService: async function(id,productData){
    return await productModel.updateOne(
        { _id: id },
        productData
      );
  },

  deleteProductService: async function(id){
    await productModel.deleteOne({ _id: id });
  }
};
