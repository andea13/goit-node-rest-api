import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValidId = (req, res, next) => {
  const { id, contactId } = req.params;
  if (!isValidObjectId(id || contactId)) {
    next(HttpError(400, `${id || contactId} is not a valid id`));
    return;
  }

  next();
};

export default isValidId;
