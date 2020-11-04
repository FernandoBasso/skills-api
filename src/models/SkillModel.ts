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

interface ISkill extends Document {
  title: string,
}

const SkillSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

SkillSchema.path('title').index({ unique: true });

const Skill = mongoose.model<ISkill>('Skill', SkillSchema);

const create = async (
  skill: CreateQuery<ISkill>
): Promise<IBaseError<MongoError> | IBaseData<ISkill>> => {
  try {
    const skillResult = await Skill.create(skill);
    return { data: skillResult } as IBaseData<ISkill>;
  } catch (error) {
    return { error } as IBaseError<MongoError>;
  }
};

export {
  ISkill,
  SkillSchema,
  create,
};

