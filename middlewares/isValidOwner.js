import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";

const isValidOwner = async (req, res, next) => {
  const { id, contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findById(id || contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }

  if (contact.owner.toString() !== owner.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

export default isValidOwner;
