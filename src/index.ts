import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  getEnvFile,
} from 'config/helpers';

/**
 * Loads the key-value pairs from .env.<some-env>.
 */
dotenv.config({ path: getEnvFile() });

import { skillsRouter } from 'src/routes/skills';
import { usersRouter } from 'src/routes/users';
import { sessionsRouter } from 'src/routes/sessions';

import {
  sessionsPOST,
} from 'src/controllers/SessionsController';

import db from 'src/db';

////
// Init the Mongoose/MongoDB Database Connection.
//
db();

////
// Since ‘.dev’ has become part of valid TLDs, (about 2017), we can't
// develop with local URLs like ‘myproj.dev’ because the browser redirects
// to HTTPS and we are not always locally running HTTPS. Looks like
// local URLs ending with ‘.local’ are OK.
//
const HOST = process.env.HOST || 'skillsapi.local';
const PORT = Number(process.env.PORT) || 3001;

const app = express();
app.use(bodyParser.json());

////
// Register the routes.
//
app.use('/skills', skillsRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);

////
// Home.
//
app.get('/', (req, res) => {
  res.send('Welcome aboard the Skills API!');
});

////
// Login.
//
app.post('/sessions', sessionsPOST);

app.listen(PORT, HOST, function listener () {
  console.log(`App listening on http://${HOST}:${PORT}`);
});

