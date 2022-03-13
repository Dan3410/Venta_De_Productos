const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const resModifier = require("../utils/resModifier");

router.get("/products", (req, res) =>
  productController.getAllProducts(req).then(
    (result) =>{
      resModifier.modifyRes(
        res,
        result.code,
        "Items Extracted",
        result.products
      )},
    () => resModifier.sendErrorServer(res)
  )
);

module.exports = router;
