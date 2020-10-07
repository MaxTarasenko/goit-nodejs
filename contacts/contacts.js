const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: value => value.includes('@'),
    },
    phone: { type: String, required: true },
    subscription: { type: String, default: 'free' },
    password: { type: String, default: 'password' },
    token: { type: String, default: '' },
  },
  {
    versionKey: false,
  },
);
contactSchema.plugin(mongoosePaginate);

const Contacts = mongoose.model('contacts', contactSchema);

// Getting contacts
const listContacts = async ({ query: { page, limit, sub } }, res) =>
  await Contacts.paginate(sub ? { subscription: sub } : {}, {
    page: page ? page : 1,
    limit: limit ? limit : 10,
  }).then(({ docs }) => res.json(docs));

// Getting a contact by id
const getContactById = async (req, res) =>
  await Contacts.findById(req.params.contactId)
    .then(data => res.json(data))
    .catch(() => res.status(404).json({ message: 'Not found' }));

// Delete contact by id
const removeContact = async (req, res) =>
  await Contacts.findByIdAndRemove(req.params.contactId)
    .then(() => res.json({ message: 'contact deleted' }))
    .catch(() => res.status(404).json({ message: 'Not found' }));

// Add contact
const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!(name && email && phone)) {
    res.status(400).json({ message: 'missing required name field' });
    return;
  }

  const isContact = await Contacts.findOne({
    name: name,
    email: email,
    phone: phone,
  }).exec();

  if (isContact) {
    res.status(422).json({ message: 'entity already exists' });
  } else {
    Contacts.create(req.body)
      .then(data => res.json(data))
      .catch(() =>
        res
          .status(400)
          .json({ message: 'check if the data entered is correct' }),
      );
  }
};

// Update contact
const updateContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!(name || email || phone)) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }

  await Contacts.findByIdAndUpdate(req.params.contactId, req.body)
    .then(() => res.json({ message: 'contact updated' }))
    .catch(() => res.status(404).json({ message: 'Not found' }));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
