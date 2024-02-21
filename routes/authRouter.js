import express from "express";
import validateBody from "../helpers/validateBody.js";
import { schemas } from "../models/user.js";
import { register } from "../controllers/auth.js";

const router = express.Router();

//signup
router.post(
  "/register",
  validateBody(schemas.registrationUserSchema),
  register
);

export default router;
