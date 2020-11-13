import mongoose, {
  Schema,
  Document,
  CreateQuery,
} from 'mongoose';

import { MongoError } from 'mongodb';

import {
  IBaseError,
  IBaseData,
} from 'src/types/Base.t';

interface ISkillDoc extends Document {
  title: string,
}

const SkillSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

SkillSchema.path('title').index({ unique: true });

const Skill = mongoose.model<ISkillDoc>('Skill', SkillSchema);

const findByTitle = async (
  title: string,
): Promise<IBaseError<unknown> | IBaseData<ISkillDoc>> => {

  const regex = new RegExp(`^${title}$`, 'i');

  console.log('==== regex', regex);

  const skill = await Skill.findOne({
    title: {
      $regex: regex,
    },
  });

  if (skill !== null) {
    return { data: skill } as IBaseData<ISkillDoc>;
  }

  return {
    error: {
      message: 'Skill not found',
    },
  } as IBaseError<unknown>;
};

const create = async (
  skill: CreateQuery<ISkillDoc>,
): Promise<IBaseError<MongoError> | IBaseData<ISkillDoc>> => {
  try {
    const skillResult = await Skill.create(skill);
    return { data: skillResult } as IBaseData<ISkillDoc>;
  } catch (error) {
    return { error } as IBaseError<MongoError>;
  }
};

export {
  ISkillDoc,
  SkillSchema,
  Skill,
  findByTitle,
  create,
};
