import {
  compose,
  last,
  pathOr,
  split,
  when,
  equals,
} from 'ramda';

import jwt from 'jsonwebtoken';

import {
  Request,
} from 'express';

import {
  IUser,
} from 'src/types/User.t';

/**
 * Generates a new session token that allow the user to access restriced resources.
 *
 * For now, we are signing the tokens using only the email which is available
 * both when signing up and when signing in.
 */
export function generateSessionToken(user: IUser): string {
  const data = {
    email: user.email,
  };

  return jwt.sign(
    data,
    process.env.JWT_SECRET as jwt.Secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
}

/**
 * Extracts the Bearer token from the headers, if available.
 */
export function parseToken(req: Request): undefined | string {
  const token = compose(
    when(equals(''), () => undefined),
    last,
    split(' '),
    pathOr('', ['headers', 'authorization']),
  )(req) as undefined | string;

  return token;
}
