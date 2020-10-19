require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./api/contacts/router');
const userRouter = require('./api/users/router');
const authRouter = require('./api/auth/router');
const { host, port, databaseUrl } = require('./config');

mongoose.connect(
  databaseUrl,
  { useNewUrlParser: true, useFindAndModify: false },
  err => {
    if (err) {
      console.log('Database connection error');
      process.exit(1);
    }
    console.log('Database connection successful');
  },
);

// Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

const corsOptions = {
  origin: host,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// REST API for working with a collection of contacts
app.use('/', contactsRouter);
// REST API for working with a collection of users
app.use('/', userRouter);
// REST API Auth
app.use('/', authRouter);

app.listen(port, () =>
  console.log(
    `console.log('CORS-enabled web server listening on http://${host}:${port}`,
  ),
);
