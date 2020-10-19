const { Router } = require('express');
const contactsRouter = Router();
const ContactsControl = require('./contacts.controller');

contactsRouter.get('/api/contacts', ContactsControl.getContacts);

contactsRouter.get('/api/contacts/:contactid', ContactsControl.getContact);

contactsRouter.post(
  '/api/contacts/',
  ContactsControl.validateAddContact,
  ContactsControl.addContact,
);

contactsRouter.delete(
  '/api/contacts/:contactid',
  ContactsControl.removeContact,
);

contactsRouter.patch(
  '/api/contacts/:contactid',
  ContactsControl.validateUpdateContact,
  ContactsControl.updateContact,
);

module.exports = contactsRouter;
