import mongoose from 'mongoose';

import {
  IBaseData,
  IBaseError,
} from 'src/types/Base.t';

import {
  IUserSignUp,
  IUser,
  IUserDoc,
} from 'src/types/User.t';

import { IUserSkill } from 'src/types/UserSkill.t';

import {
  IHTTPUnprocessableEntity,
  IHTTPConflict,
} from 'src/types/HTTPStatusCodes.t';

import {
  findByTitle as findSkillByTitle,
} from 'src/models/SkillModel';

const UserSkillSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  idSkill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
});

const UserSkill = mongoose.model<IUserDoc>('UserSkill', UserSkillSchema);

async function create(
  userSkill : IUserSkill,
): Promise<undefined | IHTTPConflict | IHTTPUnprocessableEntity | IUserSkill> {
  const { idSkill, title } = userSkill;
  ////
  // If both are falsy then we can't link a non-skill to a user.
  //
  // if (!idSkill || !title) {
  //   return {
  //     status: 422,
  //     message: 'Invalid user-skill data...',
  //   } as IHTTPUnprocessableEntity;
  // }

  const foundSkill = await findSkillByTitle(title as string);

  console.log('==== foundSkill', foundSkill);
  return undefined;
  //
  // if (found) {
  //   return {
  //     status: 409,
  //     message: 'A user with that email already exists.',
  //   } as IHTTPConflict;
  // }
  //
  // const user = new User({
  //   email,
  //   password,
  // });
  //
  // await user.save();
  //
  // return user;
}

export {
  UserSkillSchema,
  UserSkill,
  create,
};
