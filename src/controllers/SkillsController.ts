import {
  Response,
} from 'express';

import {
  IRequest,
} from 'src/types/express.t';

export function index (req: IRequest, res: Response): void {
  // @NOTE: Dummy data just to get basic stuff working.
  res.send(['The Force', 'TypeScript', 'Lightsaber']);
};

