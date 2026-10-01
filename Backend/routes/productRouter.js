const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  productReviews,
  reviewProduct,
  deleteReviews,
} = require("../controller/productController");
const { AuthoriseUser,authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products/new").post(AuthoriseUser,authorizeRole("admin"),createProduct);
router.get("/product",getAllProducts);

router.route("/product/:id").put(AuthoriseUser,authorizeRole("admin"),updateProduct);
router.route("/product/:id").delete(AuthoriseUser,authorizeRole("admin"),deleteProduct).get(getProductDetail);
// reviews
router.route("/review").put(AuthoriseUser,productReviews)
// get review of a product
router.route("/review").get(reviewProduct).delete(deleteReviews)


module.exports = router;
