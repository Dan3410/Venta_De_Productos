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
    (result) => {
      resModifier.modifyRes(
        res,
        result.code,
        "Item Data Modified",
        result.product
      );
    },
    () => resModifier.sendErrorServer(res)
  )
);
router.post("/", (req, res) =>{
  productController.createProduct(req, res).then(
    (result) => {
      console.log(result)
      if (result.code === 201)
        resModifier.modifyRes(
          res,
          result.code,
          "Item Uploaded to Database",
          result.product
        );
      if (result.code === 401)
          resModifier.sendClientError(res,401)
    },
    (error) => {
      console.log(error);
      resModifier.sendErrorServer(res);
    }
  )
}
);

module.exports = router;
