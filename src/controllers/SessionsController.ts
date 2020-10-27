import {
  Response,
} from 'express';

import {
  IRequest,
} from 'src/types/express.t';

import {
  IUser,
} from 'src/types/User';

import {
  create,
} from 'src/models/SessionModel';

/**
 * Creates a new session if the login data is valid.
 *
 * It needs a user with an email and password, generates the token
 * and sends it back to the client.
 */
export async function sessionsPOST (req: IRequest, res: Response): Promise<void> {
  const data: IUser = req.body.data;
  const token = await create(data);
  res.json({ token });
}

