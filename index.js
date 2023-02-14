const { program } = require("commander");
const contacts = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const argv = program.opts();
console.log(argv);


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      //node index.js --action list
      break;

    case "get":
      const getContact = await contacts.getContactById(id);
      console.table(getContact);
      //node index.js --action get --id 5
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      //node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      //node index.js --action remove --id=3
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
