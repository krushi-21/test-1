import express from "express";
import {
  viewAllProducts,
  viewProduct,
  getProductReview,
  addReview,
  addToCart,
  viewCart,
  deleteCartProduct,
  addProduct,
  viewProductbyCategory,
} from "./controller.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = express.Router();

router.get("/view-all-product", viewAllProducts);

router.get("/view-all-product/:category", viewProductbyCategory);
router.get("/view-product/:id", viewProduct);
router.use(auth);
router.get("/view-review/:id", getProductReview);
router.post("/add-review/:id", addReview);

router.post("/add-to-cart/:id", addToCart);
router.get("/view-cart", viewCart);
router.delete("/delete-cart-product/:id", deleteCartProduct);
router.use(isAdmin);
router.post("/add-product", addProduct);

export default router;
