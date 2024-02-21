import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(HttpError(409, "Email already in use"));
    }

    const newUser = User.create(req.body);

    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (err) {
    next(err);
  }
};
