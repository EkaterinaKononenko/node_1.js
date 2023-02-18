const path = require("path");
const fs = require("fs/promises");
const contactsPath = path.join(__dirname, "./db/contacts.json");


async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}


async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const result = contacts.find((contact) => contact.id === contactId);;
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
    try {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index === -1) {
        return false;
      }
      const deletedContact = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); 
      return deletedContact;
    } catch (error) {
      console.log(error);
    }
}


 async function addContact(name, email, phone) {
   try {
     const data = await fs.readFile(contactsPath);
     const contacts = JSON.parse(data);
     const contactsNew = { id: Date.now(), name, email, phone };
     contacts.push(contactsNew);
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
     return contactsNew;
   } catch (error) {
     console.log(error);
   }
 } 

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};