import {
  IRequest,
} from 'src/types/express.t';

import {
  Response,
} from 'express';

import { IUserSkill } from 'src/types/UserSkill.t';

import {
  tgHasStatusCode,
} from 'src/types/HTTPStatusCodes.t';

import {
  create as skillCreate,
} from 'src/models/SkillModel';

import {
  create as userSkillCreate,
} from 'src/models/UserSkillModel';

/**
 * @POST
 * Creates a user/skill relation.
 */
export async function create(
  req: IRequest, res: Response,
): Promise<void> {
  const { idUser, idSkill, title }: IUserSkill = req.body.data;

  console.log('==== ', idUser, idSkill, title);

  const userSkillResult = await userSkillCreate({
    idUser,
    idSkill,
    title,
  } as IUserSkill);

  res.sendStatus(200);
}
