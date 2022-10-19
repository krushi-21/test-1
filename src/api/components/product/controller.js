import { handleResponse, handleError } from "../../helpers/requestHandler.js";
import Product from "./model.js";
import Review from "./reviewModel.js";
import Cart from "./cartModel.js";
import { addProductRequest, addProductReviewRequest } from "./validation.js";
import messages from "../../config/messages.js";

export const viewAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    if (product?.error) {
      return handleError({ res, err: product.error });
    }
    return handleResponse({ res, msg: messages.SUCCESS, data: product });
  } catch (err) {
    console.log(err);
  }
};

export const viewProductbyCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const product = await Product.find({ category });
    if (product?.error) {
      return handleError({ res, err: product.error });
    }
    if (product.length == 0) {
      return handleError({ res, err: "no product found " });
    }
    return handleResponse({ res, msg: messages.SUCCESS, data: product });
  } catch (err) {
    console.log(err);
  }
};

export const viewProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product?.error) {
      return handleError({ res, err: product.error });
    }
    return handleResponse({ res, msg: messages.SUCCESS, data: product });
  } catch (err) {
    console.log(err);
  }
};
export const getProductReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findById(id);
    if (review?.error) {
      return handleError({ res, err: review.error });
    }
    return handleResponse({ res, msg: messages.SUCCESS, data: review });
  } catch (err) {
    console.log(err);
  }
};

export const viewCart = async (req, res) => {
  try {
    if (!req.session.cart) {
      return handleError({ res, err: "Cart is empty" });
    }
    var cart = new Cart(req.session.cart);

    return handleResponse({ res, msg: messages.SUCCESS, data: cart });
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (req, res) => {
  try {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = await Product.findById(productId);
    cart.add(product, productId);
    req.session.cart = cart;
    return handleResponse({ res, msg: messages.SUCCESS, data: cart });
  } catch (err) {
    console.log(err);
  }
};
export const deleteCartProduct = async (req, res) => {
  try {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.remove(productId);
    req.session.cart = cart;
    return handleResponse({ res, msg: messages.SUCCESS });
  } catch (e) {
    console.log(e);
  }
};

export const addReview = async (req, res) => {
  const productId = req.params.id;
  const validation = await addProductReviewRequest(req.body);
  if (validation.error) {
    return handleError({ res, err: validation.message });
  }
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    return handleError({ res, err: messages.PRODUCT_NOT_FOUND });
  }
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user._id,
  });
  if (alreadySubmitted) {
    return handleError({ res, err: messages.REVIEW_ALREADY_SUBMITED });
  }
  req.body.user = req.user._id;
  req.body.product = productId;
  const review = await Review.create(req.body);
  return handleResponse({ res, msg: messages.SUCCESS, data: review });
};

export const addProduct = async (req, res) => {
  try {
    const validation = await addProductRequest(req.body);
    if (validation.error) {
      return handleError({ res, err: validation.message });
    }
    const createProduct = await Product.create(req.body);
    if (createProduct?.error) {
      return handleError({ res, err: createProduct.error });
    }
    return handleResponse({ res, msg: messages.SUCCESS, data: createProduct });
  } catch (err) {
    console.log(err);
  }
};
