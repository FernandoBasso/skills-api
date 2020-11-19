import {
  Response,
} from 'express';

import { MongoError } from 'mongodb';

import {
  IHTTPConflict,
} from 'src/types/HTTPStatusCodes.t';

import {
  IRequest,
} from 'src/types/express.t';

import {
  tgIsBaseError,
} from 'src/types/Base.t';

import {
  create as skillCreate,
} from 'src/models/SkillModel';

import {
  MONGO_DUPLICATE_KEY_ERROR,
} from 'src/consts';

function index(req: IRequest, res: Response): void {
  // @NOTE: Dummy data just to get basic stuff working.
  res.send(['The Force', 'TypeScript', 'Lightsaber']);
}

async function create(req: IRequest, res: Response): Promise<void> {
  const skillName = req.body.data;
  const result = await skillCreate(skillName);

  if (tgIsBaseError(result)) {
    if ((result.error as MongoError).code === MONGO_DUPLICATE_KEY_ERROR) {
      res.send({
        status: 409,
        message: 'There is already a skill with that title',
      } as IHTTPConflict);

      return;
    }
    res.send({
      status: 500,
      message: 'Internal Server Error. Something went wrong while creating a skill',
    });

    return;
  }

  res.send({
    status: 200,
    data: result,
  });
}

export {
  index,
  create,
};
