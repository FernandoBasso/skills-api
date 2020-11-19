import mongoose, {
  Document,
} from 'mongoose';

export interface IUserSkill {
  idUser: mongoose.Types.ObjectId;
  idSkill?: mongoose.Types.ObjectId;
  title?: string;
}

export interface IUserSkillDoc extends IUserSkill, Document {}
