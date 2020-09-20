require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactsRoutes = require('./routes/contacts');
const mongoose = require('mongoose');

// Set up default mongoose connection
mongoose.connect(
  'mongodb+srv://dzhoi:4VZQ4hxa2uTHfLZ7@cluster0.7wmkk.mongodb.net/db-contacts?retryWrites=true&w=majority',
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

const corsOptions = {
  origin: www,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// REST API for working with a collection of contacts
app.use('/', contactsRoutes);

app.listen(port, () =>
  console.log(
    `console.log('CORS-enabled web server listening on http://localhost:${port}`,
  ),
);
