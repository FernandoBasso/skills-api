import {
  IRequest,
} from 'src/types/express.t';

import {
  Response,
} from 'express';

import { IBaseData } from 'src/types/Base.t';

import { IUserSkill } from 'src/types/UserSkill.t';

import {
  create as userSkillCreate,
} from 'src/models/UserSkillModel';

const makeDataResponse = <T>(data: T): IBaseData<T> => {
  return { data };
};

/**
 * @POST
 * Creates a user/skill relation.
 */
export async function create(
  req: IRequest, res: Response,
): Promise<void> {
  const { idUser, idSkill, title }: IUserSkill = req.body.data;

  const userSkillResult = await userSkillCreate({
    idUser,
    idSkill,
    title,
  } as IUserSkill);

  res.status(200).send(makeDataResponse<IUserSkill>(userSkillResult as IUserSkill));
}
