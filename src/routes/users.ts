import {
  Router,
} from 'express';

import {
  create,
} from 'src/controllers/UsersController';

const usersRouter = Router();

usersRouter.post('/', create);

export {
  usersRouter,
};

