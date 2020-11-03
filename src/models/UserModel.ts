import mongoose, {
  Document,
} from 'mongoose';

import bcrypt from 'bcryptjs';

import {
  IUserSignUp,
  IUser,
} from 'src/types/User.t';

import {
  IHTTPUnprocessableEntity,
  IHTTPConflict,
} from 'src/types/HTTPStatusCodes.t';

const User = mongoose.model<IUser & Document>('user', new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: undefined,
  },
}));

/**
 * Attemps to find the user by one of the possible user fields.
 */
async function findByEmail (email: string): Promise<null | Document & IUser> {
  return User.findOne({ email });
};

async function create (
  signInData: IUserSignUp
): Promise<IHTTPConflict | IHTTPUnprocessableEntity | IUser> {
  const { email, password } = signInData;

  if (!email || !password) {
    return {
      status: 422,
      message: 'Invalid sign in data provided',
    } as IHTTPUnprocessableEntity;
  }

  const found = await User.findOne({ email });

  if (found) {
    return {
      status: 409,
      message: 'An user with that email already exists',
    } as IHTTPConflict;
  }

  const user = new User({
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  return user;
};


export {
  // User,
  findByEmail,
  create,
};
;
