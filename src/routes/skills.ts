import {
  Router,
} from 'express';

import {
  index,
  create,
} from 'src/controllers/SkillsController';

import {
  authToken,
} from 'src/middlewares/authToken';

const skillsRouter = Router();

////
// We register this router module middleware with
//
//   app.use('/skills');
//
// so, our ‘get’ to the index of skills need just be ‘/’ and it will
// become ‘/skills/’. Similarly, a route of ‘/create’ will end up as
// ‘/skills/create’.
//

skillsRouter.get('/', authToken, index);
skillsRouter.post('/', authToken, create);

export {
  skillsRouter,
};
