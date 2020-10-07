const jwt = require('jsonwebtoken');
const jwtSecret = 'secret';
const bcrypt = require('bcryptjs');
const User = require('../users/users.model');

// New user registration
const registration = async ({ body: { email, password } }, res) => {
  const isUser = await User.findOne({ email: email }).exec();
  if (isUser) return res.status(409).json({ message: 'Email in use' });

  const passwordHash = await bcrypt.hash(password, 6);
  await User.create({
    email: email,
    password: passwordHash,
  }).then(data =>
    res.status(201).json({
      user: {
        email: data.email,
        subscription: data.subscription,
      },
    }),
  );
};

// Login user
const login = async ({ body: { email, password } }, res) => {
  const user = await User.findOne({ email: email }).exec();
  if (!user) return res.status(401).json('Email is wrong');
  const isRightPassword = await bcrypt.compare(password, user.password);
  if (!isRightPassword) return res.status(401).json('Password is wrong');

  const token = jwt.sign({ userId: user._id }, jwtSecret);
  await User.findOneAndUpdate({ email: email }, { token: token }).then(data =>
    res.json({
      token: token,
      user: {
        email: data.email,
        subscription: data.subscription,
      },
    }),
  );
};

// Token verification
const authorize = async (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');

    let userId;
    try {
      userId = await jwt.verify(token, jwtSecret).userId;
    } catch (err) {
      return res.status(401).json('Not authorized');
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json('Not authorized');
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json('Not authorized');
  }
};

const logout = async (req, res) =>
  await User.findByIdAndUpdate(req.user, { token: '' }).then(() =>
    res.status(204).end(),
  );

module.exports = {
  registration,
  login,
  logout,
  authorize,
};
