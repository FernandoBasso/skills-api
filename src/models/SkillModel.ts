import mongoose, {
  Schema,
  Document,
} from 'mongoose';

import {
  DocumentCreationError,
} from 'src/libs/exceptions';

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

  const skill = await Skill.findOne({
    title: { $regex: regex },
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
  // skill: CreateQuery<ISkillDoc>,
  title: string,
): Promise<never | ISkillDoc> => {
  try {
    const skillResult = await Skill.create({ title });
    return skillResult;
  } catch (error) {
    throw new DocumentCreationError(`Could not create the skill “${title}”.`);
  }
};

export {
  ISkillDoc,
  SkillSchema,
  Skill,
  findByTitle,
  create,
};
