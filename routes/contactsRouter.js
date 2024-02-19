import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { schemas } from "../models/contact.js";
import validateBody from "../helpers/validateBody.js";
import isValiId from "../middlewares/isValidID.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValiId, getOneContact);

contactsRouter.delete("/:id", isValiId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  isValiId,
  validateBody(schemas.updateContactSchema),
  updateContact
);
contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
