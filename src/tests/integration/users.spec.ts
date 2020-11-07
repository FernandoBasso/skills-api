import { ConnectionBase } from 'mongoose';
import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import { dbInit } from 'src/db';
import { IUser } from 'src/types/User.t';
import { User } from 'src/models/UserModel';

import {
  getEnvFile,
} from 'config/helpers';

dotenv.config({ path: getEnvFile() });

let dbConnectionClose: ConnectionBase['close'];

beforeAll(() => {
  dbConnectionClose = dbInit();
});

afterAll(() => {
  dbConnectionClose();
});

var app: Express;
var user: IUser;

beforeEach(async () => {
  const mod = await import('src/index');
  app = mod.app;

  user = new User({
    name: 'User 1',
    email: 'dev1@dev.io',
    password: 's3cr37',
  });

  await user.save();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('/users', () => {
  describe('POST /users', () => {
    it('should respond with 422 Unprocessable Entity when email is invalid', async () => {
      const res = await request(app)
        .post('/users')
        .send({ data: { email: null, password: 'sp33k-l337' } });

      expect(res.status).toBe(422);
    });

    it('should respond with 422 Unprocessable Entity when password is invalid', async () => {
      const res = await request(app)
        .post('/users')
        .send({ data: { email: 'dev1@dev.io', password: undefined } });

      expect(res.status).toBe(422);
    });

    it('should respond with 409 response when email already exists', async () => {
      const res = await request(app)
        .post('/users')
        .send({ data: { email: 'dev1@dev.io', password: '123456' } });

      expect(res.status).toBe(409);
      expect(res.body).toEqual({
        status: 409,
        message: 'A user with that email already exists.',
      });
    });
  });
});

