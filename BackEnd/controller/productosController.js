const resModifier = require("./resModifier");
const tokenCheck = require("./tokenCheck");
const accountCheck = require("./accountCheck");
const productosModel = require("../models/productosModel");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const productos = await productosModel.find().populate("");
      resModifier.modifyRes(res, "Success", "Items Extracted", productos);
    } catch (e) {
      resModifier.modifyRes(res, "Error", e.message, null);
    }
  },
  getById: async function (req, res, next) {
    try {
      const producto = await productosModel
        .findById({ _id: req.params.id })
        .select({
          name: 1,
          price: 1,
          code: 1,
          description: 1,
          category: 1,
          photo: 1,
        });
      resModifier.modifyRes(res, "Success", "Item Found", producto);
    } catch (e) {
      resModifier.modifyRes(res, "Error", e.message, null);
    }
  },
  create: async function (req, res, next) {
    if (
      (await accountCheck.hasPrivilege(req.body.userName, res)) &&
      (await tokenCheck.isTokenValid(req.body.token,req, res))
    ) {
      try {
        const producto = new productosModel({
          name: req.body.newData.name,
          price: req.body.newData.price,
          description: req.body.newData.description,
          code: req.body.newData.code,
          category: req.body.newData.category,
          photo: req.body.newData.photo,
        });
        const documento = await producto.save();
        resModifier.modifyRes(
          res,
          "Success",
          "Item Uploaded to Database",
          documento
        );
      } catch (e) {
        resModifier.modifyRes(res, "Error", e.message, documento);
      }
    }
  },

  update: async function (req, res, next) {
    if (
      (await accountCheck.hasPrivilege(req.body.userName, res)) &&
      (await tokenCheck.isTokenValid(req.body.token, req, res))
    ) {
      try {
        const producto = await productosModel.updateOne(
          { _id: req.params.id },
          req.body.newData
        );
        resModifier.modifyRes(res, "Success", "Item Data Modified", producto);
      } catch (e) {
        resModifier.modifyRes(res, "Error", e.message, null);
      }
    }
  },

  delete: async function (req, res, next) {
    console.log(req.body)
    const token = req.body.token;
    try {
    if (
      (await accountCheck.hasPrivilege(req.body.userName, res)) &&
      (await tokenCheck.isTokenValid(token, req, res))
    ) {
      
        const producto = await productosModel.deleteOne({ _id: req.params.id });
        resModifier.modifyRes(res, "Success", "Item Deleted", null);
      }} catch (e) {
        resModifier.modifyRes(res, "Error", e.message, null);
      }
    } /*Si no tiene privilegios o el token es invalido, se modifico el res en alguna de las
       que fallo, entonces no deberia modificarlo aca */
};
