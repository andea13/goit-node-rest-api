import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    if (favorite === "true") {
      const favorites = await Contact.find(
        { owner, favorite: true },
        "-createdAt -updatedAt",
        {
          skip,
          limit,
        }
      );
      res.json(favorites);
    } else {
      const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit,
      });

      res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const result = await Contact.findOne(
      { _id: id, owner },
      "-createdAt -updatedAt"
    );
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }

    if (contact.owner.toString() !== owner.toString()) {
      throw HttpError(403, "Forbidden");
    }

    const result = await Contact.findByIdAndDelete(id, "-createdAt -updatedAt");

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { name, email, phone } = req.body;
    const result = await Contact.create(
      { name, email, phone, owner },
      "-createdAt -updatedAt"
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }

    if (contact.owner.toString() !== owner.toString()) {
      throw HttpError(403, "Forbidden");
    }

    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      throw HttpError(400, "Body must have at least one field");
    }

    if (!result) {
      throw HttpError(404, "Not found");
    }

    const result = await Contact.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      },
      "-createdAt -updatedAt"
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }

    if (contact.owner.toString() !== owner.toString()) {
      throw HttpError(403, "Forbidden");
    }

    const result = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      },
      "-createdAt -updatedAt"
    );

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
