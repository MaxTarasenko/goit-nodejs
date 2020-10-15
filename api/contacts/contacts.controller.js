const Joi = require('@hapi/joi');
const isEmpty = require('lodash.isempty');
const contactsModel = require('./contacts.model');
const val = require('../validation/validation');

class ContactsController {
  // Validation
  validateAddContact(req, res, next) {
    const schema = Joi.object(val.postValidation);
    const validation = schema.validate(req.body);

    if (validation.error) return handleValidationError(res, validation);

    next();
  }

  validateUpdateContact(req, res, next) {
    const schema = Joi.object(val.patchValidation);
    const validation = schema.validate(req.body);

    if (validation.error) return handleValidationError(res, validation);

    next();
  }

  // GET
  async getContacts({ query: { page, limit, sub } }, res) {
    try {
      const { docs } = await contactsModel.paginate(
        sub ? { subscription: sub } : {},
        {
          page: page ? page : 1,
          limit: limit ? limit : 10,
        },
      );

      res.status(200).send(docs);
    } catch (err) {
      res.status(404).json({ message: 'Not found' });
    }
  }

  async getContact({ params: { contactid } }, res) {
    try {
      const contact = await contactsModel.findById(contactid);

      res.status(200).send(contact);
    } catch (err) {
      res.status(404).json({ message: 'Not found' });
    }
  }

  // POST
  async addContact(req, res) {
    try {
      const newContact = { ...req.body };
      const existedContact = await contactsModel.findOne({
        email: newContact.email,
      });

      if (existedContact)
        return res.status(400).send('Contact with such email already exists');

      const createdСontact = await contactsModel.create(newContact);

      res.status(201).send(createdСontact);
    } catch (err) {
      res.status(404).json({ message: 'Not found' });
    }
  }

  // DELETE
  async removeContact({ params: { contactid } }, res) {
    try {
      const deletedСontact = await contactsModel.findByIdAndRemove(contactid);

      if (deletedСontact) res.status(200).send({ message: 'contact deleted' });
      else res.status(404).json({ message: 'Not found' });
    } catch (err) {
      res.status(404).json({ message: 'Not found' });
    }
  }

  // PATCH
  async updateContact(req, res) {
    try {
      const { contactid } = req.params;
      const updatedContact = { ...req.body };

      if (isEmpty(req.body)) return res.status(400).send('missing fields');

      const newContact = await contactsModel.findByIdAndUpdate(
        contactid,
        updatedContact,
      );

      if (newContact) res.status(200).send(newContact);
      else res.status(404).json({ message: 'Not found' });
    } catch (err) {
      res.status(404).json({ message: 'Not found' });
    }
  }
}

function handleValidationError(res, val) {
  return res.status(400).send(val.error.message);
}
module.exports = new ContactsController();
