import { Schema, model } from "mongoose";
import Joi from "joi";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const registrationUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionStatusSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const checkIfEmailVerifiedSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Missing required field email",
  }),
});

export const schemas = {
  registrationUserSchema,
  loginUserSchema,
  updateSubscriptionStatusSchema,
  checkIfEmailVerifiedSchema,
};

export const User = model("user", userSchema);
