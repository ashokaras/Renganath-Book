import express from "express";
const router = express.Router();

import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from "../controllers/customerController.js";

router.route("/").post(createCustomer).get(getAllCustomers);
// remember about :id
router.route("/:id").delete(deleteCustomer).patch(updateCustomer);

export default router;
