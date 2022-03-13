var express = require("express");
var router = express.Router();
var productController = require("../controller/productController");
const resModifier = require("../utils/resModifier");

router.delete("/:id", (req, res) =>
  productController.deleteProduct(req, res).then(
    (result) => resModifier.modifyRes(res, result.code, "Item Deleted", null),
    () => resModifier.sendErrorServer(res)
  )
);
router.put("/:id", (req, res) =>
  productController.updateProduct(req, res).then(
    (result) =>
      resModifier.modifyRes(res, result.code, "Item Data Modified", result.product),
    () => resModifier.sendErrorServer(res)
  )
);
router.post("/", (req, res) =>
  productController.createProduct(req, res).then(
    (result) =>
      resModifier.modifyRes(
        res,
        result.code,
        "Item Uploaded to Database",
        result.product
      ),
    () => resModifier.sendErrorServer(res)
  )
);

module.exports = router;
