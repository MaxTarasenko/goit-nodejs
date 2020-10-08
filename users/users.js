const User = require('./users.model');

const currentUser = async ({ user: { email, subscription } }, res) =>
  await res.json({
    email: email,
    subscription: subscription,
  });

const userUpdate = async ({ body: { email, subscription } }, res) =>
  await User.findOneAndUpdate(email, {
    subscription: subscription,
  }).then(() =>
    res.json({
      user: {
        email: email,
        subscription: subscription,
      },
    }),
  );

module.exports = {
  currentUser,
  userUpdate,
};
