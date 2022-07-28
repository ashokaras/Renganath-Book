import express from "express";
const router = express.Router();

import {
  createBilling,
  deleteBilling,
  getAllBillings,
  updateBilling,
} from "../controllers/billingController.js";

router.route("/").post(createBilling).get(getAllBillings);
// remember about :id
router.route("/:id").delete(deleteBilling).patch(updateBilling);

export default router;
