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
    const products = await getAllProductsService();
    return { code: 200, products: products };
  },

  getProductById: async function (req, res, next) {
    const product = await getProductWithIdService(req.params.id);
    if (product !== null) return { code: 200, product: product };
    else return { code: 404, product: null };
  },

  createProduct: async function (req, res, next) {
    const token = tokenFunctions.extractToken(req);
    const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
    const hasPrivilege = await accountFunctions.checkPrivilege(
      tokenDecoded.username,
      res
    );
    if (hasPrivilege) {
      const newProduct = await createProductService(req.body.productData);
      return { code: 201, product: newProduct };
    } else return { code: 401, product: null };
  },

  updateProduct: async function (req, res, next) {
    const token = tokenFunctions.extractToken(req);
    const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
    const hasPrivilege = await accountFunctions.checkPrivilege(
      tokenDecoded.username
    );
    if (hasPrivilege) {
      const product = await updateProductService(
        req.params.id,
        req.body.productData
      );
      return { code: 200, product: product };
    } else {
      return { code: 401, product: null };
    }
  },

  deleteProduct: async function (req, res, next) {
    const token = tokenFunctions.extractToken(req);
    const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
    await accountFunctions.checkPrivilege(tokenDecoded.username, res);
    await deleteProductService(req.params.id);
    return { code: 200 };
  },
};
