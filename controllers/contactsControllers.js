import {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContactByID,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// export const getOneContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await getContactById(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await removeContact(id);

//     if (!result) {
//       throw HttpError(404, "Not found");
//     }

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await Contact.create({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// export const updateContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await updateContactByID(id, req.body);

//     const { name, email, phone } = req.body;

//     if (!name && !email && !phone) {
//       throw HttpError(400, "Body must have at least one field");
//     }

//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
