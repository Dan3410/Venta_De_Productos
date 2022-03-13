const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const resModifier = require("../utils/resModifier");

router.get("/:id", (req, res) =>
  productController.getProductById(req).then(
    (result) => {
      if (result.code === 200)
        resModifier.modifyRes(res, result.code, "Item Found", result.product);
      if (result.code === 404)
        resModifier.sendClientError(res,404)
    },
    () => resModifier.sendErrorServer(res)
  )
);

module.exports = router;
