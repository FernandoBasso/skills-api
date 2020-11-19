import {
  Request,
  Response,
} from 'express';

import { IBaseData } from 'src/types/Base.t';

import { IUser } from './User.t';

export interface IRequest extends Request {
  user?: IUser;
}

export interface IResponse<T> extends Response {
  data?: IBaseData<T>;
}
