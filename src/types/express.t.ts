import {
  Request,
} from 'express';

import { IUser } from './User.t';

export interface IRequest extends Request {
  user?: IUser;
}
