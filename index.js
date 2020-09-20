require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactsRoutes = require('./routes/contacts');

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
