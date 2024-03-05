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
        {
          skip,
          limit,
        },
        "-createdAt -updatedAt"
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
    const { id } = req.params;

    const result = await Contact.findById({ _id: id }, "-createdAt -updatedAt");
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
    const { id } = req.params;

    const result = await Contact.findByIdAndDelete(id);

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
    const result = await Contact.create({ name, email, phone, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      throw HttpError(400, "Body must have at least one field");
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
    if (!result) {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log("contactId", contactId);

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
