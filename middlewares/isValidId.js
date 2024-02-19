import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValiId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not a valid id`));
    return;
  }

  next();
};

export default isValiId;
