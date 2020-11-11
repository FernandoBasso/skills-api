import {
  IRequest,
} from 'src/types/express.t';

import {
  Response,
} from 'express';

import {
  IUserSignUp,
} from 'src/types/User.t';

import {
  tgHasStatusCode,
} from 'src/types/HTTPStatusCodes.t';

import {
  create as userCreate,
} from 'src/models/UserModel';

/**
 * @POST
 * Creates a new user resource.
 */
export async function create(req: IRequest, res: Response): Promise<void> {
  const signUpData: IUserSignUp = req.body.data;
  const data = await userCreate(signUpData);

  //
  // If we have a status code, we reached some type of error or invalide
  // state. Let's respond with that status and the appropriate message.
  //
  if (tgHasStatusCode(data)) {
    res.status(data.status).json(data);
    return;
  }

  //
  // Everything was OK with saving the new user. Let's return a
  // standard 200 OK response with the user data.
  //
  res.json(data);
}
