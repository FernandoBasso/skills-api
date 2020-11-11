import {
  Document,
} from 'mongoose';

/**
 * To sign up (register) the user needs to provided an email and a
 * password. The encrypted password is then generated later and added to
 * the user sign in data before being persisted to a data store.
 */
export interface IUserSignUp {
  email: string;
  password: string;
  encryptedPassword?: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  encryptedPassword?: string;
}

export interface IUserDoc extends IUser, Document {}
