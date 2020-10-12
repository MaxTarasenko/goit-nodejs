require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {
  contactsRoutes,
  usersRoutes,
  authRoutes,
  multerRoutes,
} = require('./routes');
const mongoose = require('mongoose');

// Set up default mongoose connection
const dbUser = 'dzhoi';
const dbToken = '4VZQ4hxa2uTHfLZ7';
const dbName = 'db-contacts';

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbToken}@cluster0.7wmkk.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true },
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
const port = process.env.PORT || 3000;
const www = process.env.HOST || 'http://localhost';

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('public'));

const corsOptions = {
  origin: www,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// REST API for working with a collection of contacts
app.use('/', contactsRoutes);
// REST API for working with a auth
app.use('/', authRoutes);
// REST API for working with a collection of users
app.use('/', usersRoutes);
// REST API for working with a multer
app.use('/', multerRoutes);

app.listen(port, () =>
  console.log(
    `console.log('CORS-enabled web server listening on http://localhost:${port}`,
  ),
);
