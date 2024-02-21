import express from "express";
import validateBody from "../helpers/validateBody.js";
import { schemas } from "../models/user.js";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

//signup
router.post(
  "/register",
  validateBody(schemas.registrationUserSchema),
  register
);

//signin

router.post("/login", validateBody(schemas.loginUserSchema), login);

export default router;
