const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const contactsPath = path.join(__dirname, '../db', 'contacts.json');

// Output of all contacts
const listContacts = (_, res) =>
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });

// Getting a contact by id
const getContactById = (req, res) =>
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contactId = Number(req.params.contactId);
    const contacts = JSON.parse(data);
    const contactById = contacts.find(({ id }) => id === contactId);

    if (contactById) {
      res.json(contactById);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

// Delete contact by id
const removeContact = (req, res) =>
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contactId = Number(req.params.contactId);
    const contacts = JSON.parse(data);
    const findContactById = contacts.find(({ id }) => id === contactId);

    if (findContactById) {
      const filteredContacts = contacts.filter(({ id }) => id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
        if (err) throw err;
        res.json({ message: 'contact deleted' });
      });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

// Add contact
const addContact = (req, res) =>
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const { name, email, phone } = req.body;

    if (!(name && email && phone)) {
      res.status(400).json({ message: 'missing required name field' });
      return;
    }

    const contacts = JSON.parse(data);
    const findContact = contacts.find(
      e => e.name == name && e.email == email && e.phone == phone,
    );

    if (!findContact) {
      const contact = {
        id: uuid(),
        name: name,
        email: email,
        phone: phone,
      };
      contacts.push(contact);
      fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
        if (err) throw err;
      });
      res.status(201).json(contact);
    } else {
      res.status(422).json({ message: 'entity already exists' });
    }
  });

const updateContact = (req, res) => {
  const { name, email, phone } = req.body;

  if (!(name || email || phone)) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }

  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contactId = Number(req.params.contactId);
    const contacts = JSON.parse(data);
    const findContactById = contacts.find(({ id }) => id === contactId);

    if (findContactById) {
      const contactsChanged = contacts.map(obj => {
        if (obj.id === contactId) {
          obj.name = name ? name : obj.name;
          obj.email = email ? email : obj.email;
          obj.phone = phone ? phone : obj.phone;
          res.json(obj);
          return obj;
        }
        return obj;
      });
      fs.writeFile(contactsPath, JSON.stringify(contactsChanged), err => {
        if (err) throw err;
      });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
