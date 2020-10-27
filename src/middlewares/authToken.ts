import {
  Response,
  NextFunction,
} from 'express';

import {
  IRequest,
} from 'src/types/express.t';

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

  if (token === undefined) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.SECRET_TOKEN as string,
    function verifyToken (err: any, user: any) {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

export {
  authToken,
};

