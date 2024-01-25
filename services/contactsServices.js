import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { dirname } from "path";
import { fileURLToPath } from "url";
// import { assert, func } from "joi";

const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, "../db/contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  const updatedJson = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, updatedJson, "utf-8");
  return newContact;
}

export async function updateContactByID(contactId, dataToUpdate) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...dataToUpdate };
  contacts[index] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}
