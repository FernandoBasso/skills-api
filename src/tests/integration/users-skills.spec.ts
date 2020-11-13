import { ConnectionBase } from 'mongoose';
import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import { dbInit } from 'src/db';
import { User } from 'src/models/UserModel';
import { IUserDoc } from 'src/types/User.t';
import { ISkillDoc, Skill } from 'src/models/SkillModel';
import { IUserSkill } from 'src/types/UserSkill.t';

import {
  getEnvFile,
} from 'config/helpers';

dotenv.config({ path: getEnvFile() });

let dbConnectionClose: ConnectionBase['close'];
let app: Express;
let user: IUserDoc;
let skill: ISkillDoc;

beforeAll(() => {
  dbConnectionClose = dbInit();
});

afterAll(() => {
  dbConnectionClose();
});

beforeEach(async () => {
  const mod = await import('src/index');
  app = mod.app;

  user = new User({
    name: 'User 1',
    email: 'dev1@dev.io',
    password: 's3cr37',
  });

  await user.save();

  skill = new Skill({
    title: 'PHP',
  });

  await skill.save();
});

afterEach(async () => {
  await User.deleteMany({});
  await Skill.deleteMany({});
});

describe('/users-skills', () => {
  describe.only('POST', () => {
    it('should create add a skill and link it to the user', async () => {
      const userSkill: IUserSkill = {
        idUser: '5fa71f3d09c6347ed22e7c05',
        title: 'php',
      };

      const res = await request(app)
        .post('/users-skills')
        .send({ data: userSkill });

      expect(res.status).toBe(200);
    });
  });
});

