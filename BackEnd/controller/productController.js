const tokenFunctions = require("./tokenFunctions");
const accountFunctions = require("../services/users/accountFunctions");
const {
  createProductService,
  getProductWithIdService,
  getAllProductsService,
  deleteProductService,
  updateProductService,
} = require("../services/products/productServices");

module.exports = {
  getAllProducts: async function (req, res, next) {
    const products = getAllProductsService();
    return { code: 200, products: products };
  },

  getProductById: async function (req, res, next) {
    const product = getProductWithIdService(req.params.id);
    return { code: 200, product: product };
  },

  createProduct: async function (req, res, next) {
    const token = tokenFunctions.extractToken(req);
    const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
    await accountFunctions.checkPrivilege(tokenDecoded.username, res);
    const newProduct = createProductService(req.body.productData);
    return { code: 201, product: newProduct };
  },

  updateProduct: async function (req, res, next) {
    const token = tokenFunctions.extractToken(req);
    const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
    await accountFunctions.checkPrivilege(tokenDecoded.username, res);
    const product = updateProductService(req.params.id, req.body.productData);
    return { code: 200, product: product };
  },

  deleteProduct: async function (req, res, next) {
    const token = tokenFunctions.extractToken(req);
    const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
    await accountFunctions.checkPrivilege(tokenDecoded.username, res);
    await deleteProductService(req.params.id);
    return { code: 200 };
  },
};
