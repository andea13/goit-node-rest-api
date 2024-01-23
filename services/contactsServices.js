const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  const updatedJson = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, updatedJson, "utf-8");
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
