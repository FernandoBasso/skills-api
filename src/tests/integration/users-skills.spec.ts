/* eslint-disable */
import mongoose, { Connection } from 'mongoose';
import { Express } from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import { dbInit } from 'src/db';

import {
  IBaseData,
  IBaseError,
  tgIsBaseData,
} from 'src/types/Base.t';

import {
  IResponse,
} from 'src/types/express.t';

import { User } from 'src/models/UserModel';
import { IUserDoc } from 'src/types/User.t';
import { ISkillDoc, Skill } from 'src/models/SkillModel';
import { IUserSkill } from 'src/types/UserSkill.t';

import {
  getEnvFile,
} from 'config/helpers';

const ObjectId = mongoose.Types.ObjectId;

dotenv.config({ path: getEnvFile() });

interface ITestResponse<T> extends request.Response {
  body: T;
}

let dbConnectionClose: Connection['close'];
let app: Express;
let testUser: IUserDoc;
let testSkill: ISkillDoc;

beforeAll(() => {
  dbConnectionClose = dbInit();
});

afterAll(() => {
  dbConnectionClose();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Skill.deleteMany({});

  const mod = await import('src/index');
  app = mod.app;

  testUser = new User({
    name: 'User 1',
    email: 'dev1@dev.io',
    password: 's3cr37',
  });

  await testUser.save();

  testSkill = new Skill({
    title: 'PHP',
  });

  await testSkill.save();
});

afterEach(async () => {
  // await User.deleteMany({});
  // await Skill.deleteMany({});
});

describe('/users-skills', () => {
  describe('POST', () => {
    it('should add a new skill and link it to the user', async () => {
      const userSkill: IUserSkill = {
        idUser: testUser._id,
        title: 'Haskell',
      };

      const res: ITestResponse<IBaseData<IUserSkill>> = await request(app)
        .post('/users-skills')
        .send({ data: userSkill });

      const data = res.body.data;

      expect(res.status).toBe(200);
      expect(tgIsBaseData(res.body)).toBe(true);
      expect(testUser._id.equals(data.idUser)).toBe(true);
      expect(ObjectId.isValid(data.idSkill!)).toBe(true);
    });

    it('should link an existing skill to the user', async () => {
      const userSkill: IUserSkill = {
        idUser: testUser._id,
        idSkill: testSkill._id,
      };

      const res: ITestResponse<IBaseData<IUserSkill>> = await request(app)
        .post('/users-skills')
        .send({ data: userSkill });

      const data = res.body.data;

      expect(res.status).toBe(200);
      expect(tgIsBaseData(res.body)).toBe(true);
      expect(testUser._id.equals(data.idUser)).toBe(true);
      expect(testSkill._id.equals(data.idSkill)).toBe(true);
    });
  });
});
