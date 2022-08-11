import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";

router.route("/").post(createProduct).get(getAllProducts);
// remember about :id
router.route("/:id").delete(deleteProduct).patch(updateProduct);

export default router;
