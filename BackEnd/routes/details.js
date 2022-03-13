const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const resModifier = require("../utils/resModifier");

router.get("/:id", (req, res) =>
  productController.getProductById.then(
    (result) =>
      resModifier.modifyRes(res, result.code, "Item Found", result.product),
    () => resModifier.sendErrorServer(res)
  )
);

module.exports = router;
