import express from "express";
import validateBody from "../helpers/validateBody.js";
import { schemas } from "../models/user.js";
import {
  register,
  login,
  getCurrentUser,
  logout,
  updateSubscriptionStatus,
  updateAvatar,
} from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

//signup
router.post(
  "/register",
  validateBody(schemas.registrationUserSchema),
  register
);

//signin

router.post("/login", validateBody(schemas.loginUserSchema), login);

//current

router.get("/current", authenticate, getCurrentUser);

//logout

router.post("/logout", authenticate, logout);

//updateSubscription

router.patch(
  "/:_id/subscription",
  authenticate,
  validateBody(schemas.updateSubscriptionStatusSchema),
  updateSubscriptionStatus
);

//updateAvatar

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

export default router;
