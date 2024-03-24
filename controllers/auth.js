import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import sendEmail from "../helpers/sendEmail.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises";
import gravatar from "gravatar";
import jimp from "jimp";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { nanoid } from "nanoid";

dotenv.config();

const { SECRET_KEY, JWT_EXPIRES_IN, BASE_URL } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const verificationToken = nanoid();

const htmlTemplate = `
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Email verifacation</title>
      </head>
   <body style="font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="text-align: center;">Verify Your Email Address</h2>
    <p>Hello,</p>
    <p>
      Thank you for signing up! To complete your registration, please click the button below to verify your email address:
    </p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="${BASE_URL}/api/users/verify/${verificationToken}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Click to verify</a>
    </div>
    <p style="margin-top: 20px;">
    If you did not create an account or believe this email was sent to you in error, please ignore it.
    </p>
<p>Best regards,<br>Oksana Dziuba</p>
</div>
</body>
      </html>`;

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(HttpError(409, "Email in use"));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify your email",
      html: htmlTemplate,
    };

    await sendEmail(verifyEmail);

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

export const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (err) {
    next(err);
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify your email",
      html: htmlTemplate,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
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

    if (!user.verify) {
      throw HttpError(401, "Please verify your email first");
    }

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }

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

  try {
    if (!req.file) {
      throw HttpError(400, "Please upload the file");
    }
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resizedAvatar = await jimp.read(tempUpload);
    resizedAvatar.resize(250, 250).write(tempUpload);

    const resultUpload = path.join(avatarsDir, filename);

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
