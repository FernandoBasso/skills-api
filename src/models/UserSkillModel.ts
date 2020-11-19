import mongoose from 'mongoose';

import {
  IUserSkill,
  IUserSkillDoc,
} from 'src/types/UserSkill.t';

import {
  create as skillCreate,
} from 'src/models/SkillModel';

export const UserSkillSchema = new mongoose.Schema({
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

export const UserSkill = mongoose.model<IUserSkillDoc>('UserSkill', UserSkillSchema);

async function createBySkillId(
  idUser: mongoose.Types.ObjectId,
  idSkill: mongoose.Types.ObjectId,
): Promise<Error | IUserSkill> {
  const userSkill = new UserSkill({ idUser, idSkill });

  try {
    const userSkillResult = await userSkill.save();
    return userSkillResult;
  } catch (err) {
    throw new Error('Error linking the skill to the user.');
  }
}

async function createBySkillTitle(
  idUser: mongoose.Types.ObjectId,
  title: string,
): Promise<Error | IUserSkill> {
  // 1) Save the skill in the skills collection.
  const skill = await skillCreate(title);

  // 2) Get the id of the saved skill and use it to createBySkillId().
  return createBySkillId(idUser, skill._id);
}

export async function create(
  userSkillData : IUserSkill,
): Promise<never | Error | IUserSkill> {
  const { idUser, idSkill, title } = userSkillData;

  if (idSkill) {
    return createBySkillId(idUser, idSkill);
  }

  if (title) {
    return createBySkillTitle(idUser, title);
  }

  throw new TypeError('Values cannot be undefined');
}
