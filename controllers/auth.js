import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises";
import gravatar from "gravatar";
import jimp from "jimp";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(HttpError(409, "Email in use"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (err) {
    next(err);
  }
};

export const updateSubscriptionStatus = async (req, res, next) => {
  try {
    const userId = req.params._id;

    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resizedAvatar = await jimp.read(tempUpload);
  resizedAvatar.resize(250, 250).write(tempUpload);

  const resultUpload = path.join(avatarsDir, filename);

  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("/avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    if (!avatarURL) {
      throw HttpError(401, "Not authorized");
    }

    res.json({ avatarURL });
  } catch (err) {
    next(err);
  }
};
