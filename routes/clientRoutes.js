import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

import {
  registerClient,
  updateClient,
} from "../controllers/clientController.js";
router.route("/registerClient").post(apiLimiter, registerClient);
router.route("/updateClient").patch(apiLimiter, updateClient);

export default router;
