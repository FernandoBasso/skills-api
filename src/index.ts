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

const app = express();
app.use(bodyParser.json());

////
// Home.
//
app.get('/', (req, res) => {
  res.json({ text: 'Welcome aboard the Skills API!' });
});

////
// Register the routes.
//
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/skills', skillsRouter);

////
// Login.
//
app.post('/sessions', sessionsPOST);

export { app };
