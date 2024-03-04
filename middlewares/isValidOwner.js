import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";

const isValidOwner = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id, contactId } = req.params;

  const contact = await Contact.findById(id || contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }

  if (contact.owner.toString() !== owner.toString()) {
    throw HttpError(403);
  }

  next();
};

export default isValidOwner;
