import bcrypt from 'bcryptjs';

import {
  IUser,
} from 'src/types/User.t';

import {
  IHTTPNotFound,
  IHTTPUnprocessableEntity,
  IUnauthenticated,
} from 'src/types/HTTPStatusCodes.t';

import {
  TToken,
} from 'src/types/Session.t';

import {
  findByEmail,
} from 'src/models/UserModel';

import {
  generateLoginToken,
} from 'src/libs/auth';

/**
 * Verifies that user email and password are provided and can be
 * successfully verified and returns the generated login token.
 */
async function create (
  user: IUser
): Promise<IHTTPUnprocessableEntity | IHTTPNotFound | IUnauthenticated | TToken> {
  const { email, password } = user;
  if (!email || !password) {
    return {
      status: 422,
      message: 'Invalid login data',
    } as IHTTPUnprocessableEntity;
  }

  const foundUser: null | IUser = await findByEmail(email);

  if (foundUser === null) {
    return {
      status: 404,
      message: `User with email “${email}” was not found.`,
    } as IHTTPNotFound;
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch) {
    return {
      status: 401,
      message: 'Could not login',
    } as IUnauthenticated;
  }

  return generateLoginToken(user);
};

export {
  create,
}
