import {
  Router,
} from 'express';

import {
  index,
} from 'src/controllers/SkillsController';

const sessionsRouter = Router();

sessionsRouter.get('/', index);

export {
  sessionsRouter,
};

