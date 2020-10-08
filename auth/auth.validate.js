const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

// Creating a Validate Schema
const schema = {
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    subscription: { type: 'string' },
    token: { type: 'string' },
  },
  required: ['email', 'password'],
};
const validate = ajv.compile(schema);

const validation = async (req, res, next) => {
  const valid = await validate(req.body);
  if (!valid)
    return await res
      .status(400)
      .json('Invalid: ' + ajv.errorsText(validate.errors));
  next();
};

module.exports = {
  validation,
};
