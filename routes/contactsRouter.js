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
import isValidOwner from "../middlewares/isValidOwner.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValiId, isValidOwner, getOneContact);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValiId,
  isValidOwner,
  deleteContact
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValiId,
  isValidOwner,
  validateBody(schemas.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValiId,
  isValidOwner,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
