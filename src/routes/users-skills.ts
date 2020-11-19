import {
  Router,
} from 'express';

import {
  create,
} from 'src/controllers/UsersSkillsController';

const usersSkillsRouter = Router();

usersSkillsRouter.post('/', create);

export {
  usersSkillsRouter,
};
