import {
  Response,
  NextFunction,
} from 'express';

import {
  IRequest,
} from 'src/types/express.t';

import {
  IHTTPUnprocessableEntity,
} from 'src/types/HTTPStatusCodes.t';

import { IUserDoc } from 'src/types/User.t';

import jwt from 'jsonwebtoken';

import {
  parseToken,
} from 'src/libs/auth';

type TAuthToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => void | Response;

const authToken: TAuthToken = function authToken(
  req: IRequest, res, next,
): void {
  const token: undefined | string = parseToken(req);

  // Bearer token missing. Unprocessable entity.
  if (token === undefined) {
    res.send({
      status: 422,
      message: 'Unprocessable Entity',
    } as IHTTPUnprocessableEntity);
  } else {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      function verifyTokenCb(err: unknown, user: unknown) {
        if (err) {
          res.send({
            status: 401,
            message: 'Unauthenticated',
          });
        } else {
          req.user = (<IUserDoc>user);
          next();
        }
      },
    );
  }
};

export {
  authToken,
};
