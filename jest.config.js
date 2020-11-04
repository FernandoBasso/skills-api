////
// We use a different .env file for unit tests so we can
// set different databases, secrets, etc.
//
require('dotenv').config({
  path: 'config/.env.test',
});

