import {
  Response,
  NextFunction,
} from 'express';

import {
  IRequest,
} from 'src/types/express.t';

import {
  IUnauthenticated,
  IHTTPUnprocessableEntity,
} from 'src/types/HTTPStatusCodes.t';

import jwt from 'jsonwebtoken';

import {
  parseToken,
} from 'src/libs/auth';

type TAuthToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => undefined | Response;

const authToken: TAuthToken  = function authToken (req, res, next) {
  const token: undefined | string = parseToken(req);

  // Bearer token missing. Unprocessable entity.
  if (token === undefined) {
    return res.send({
      status: 422,
      message: 'Unprocessable Entity',
    } as IHTTPUnprocessableEntity);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    function verifyTokenCb (err: any, user: any) {
      if (err) return res.send({
        status: 401,
        message: 'Unauthenticated',
      });
      req.user = user;
      next();
    }
  );
};

export {
  authToken,
};

