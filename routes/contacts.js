const { Router } = require('express');
const route = Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../contacts/contacts');

// Output of all contacts
route.get('/api/contacts', [listContacts]);

// Getting a contact by id
route.get('/api/contacts/:contactId', [getContactById]);

// Delete contact by id
route.delete('/api/contacts/:contactId', [removeContact]);

// Add contact
route.post('/api/contacts', [addContact]);

// Update contact
route.patch('/api/contacts/:contactId', [updateContact]);

module.exports = route;
