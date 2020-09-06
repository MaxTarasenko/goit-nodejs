const fs = require('fs');
const path = require('path');
const { v4: id } = require('uuid');

const contactsPath = path.join(__dirname, './db', 'contacts.json');

// Output of all contacts
function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

// Getting a contact by id
function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const contactById = contacts.find(({ id }) => id === contactId);
    if (contactById) {
      console.log(contactById);
    } else {
      console.log('Contact is missing in the database');
    }
  });
}

// Delete contact by id
function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const findContactById = contacts.find(({ id }) => id === contactId);

    if (findContactById) {
      const filteredContacts = contacts.filter(({ id }) => id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
        if (err) throw err;
        console.log(`Contact with this id=${contactId} has been deleted`);
      });
    } else {
      console.log('Contact has already been deleted');
    }
  });
}

// Add contact
function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    if (!name && !email && !phone) {
      console.log('Data is empty');
    } else {
      const contacts = JSON.parse(data);
      const findContact = contacts.find(
        e => e.name == name && e.email == email && e.phone == phone,
      );

      if (!findContact) {
        contacts.push({
          id: id(),
          name: name,
          email: email,
          phone: phone,
        });
        fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
          if (err) throw err;
          console.log(`Contact was successfully added`);
        });
      } else {
        console.log('Contact already exists');
      }
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
