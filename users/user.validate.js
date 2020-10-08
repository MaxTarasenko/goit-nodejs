const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

// Creating a Validate Schema
const schema = {
  properties: {
    email: { type: 'string', format: 'email' },
    subscription: { type: 'string', enum: ['free', 'pro', 'premium'] },
  },
  required: ['email'],
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
