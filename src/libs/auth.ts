import {
  compose,
  last,
  pathOr,
  split,
  when,
  equals,
}  from 'ramda';

import jwt from 'jsonwebtoken';

import {
  Request,
} from 'express';

import {
  IUser,
} from 'src/types/User';

/**
 * Generates a new session token that allow the user to access restriced resources.
 */
export function generateLoginToken (user: IUser): string {
  return jwt.sign(user, process.env.SECRET_TOKEN as jwt.Secret, { expiresIn: 60 * 7 });
};

/**
 * Extracts the Bearer token from the headers, if available.
 */
export function parseToken (req: Request): undefined | string {
  return compose(
    when(equals(''), () => undefined),
    last,
    split(' '),
    pathOr('', ['headers', 'authorization']),
  )(req) as undefined | string;
};

