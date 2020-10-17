// Server default settings
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://localhost';

// Set up default mongoose connection
const dbUser = 'dzhoi';
const dbToken = process.env.DATABASE_TOKEN || 'token';
const dbName = 'db-contacts';
const databaseUrl = `mongodb+srv://${dbUser}:${dbToken}@cluster0.7wmkk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// JSON Web Token
const JWT_KEY = process.env.JWT_SECRETKEY;

module.exports = { port, host, databaseUrl, JWT_KEY };
