import express, {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  parseToken,
} from '../auth';

const mockNoOpResponse = {} as Response;
const mockNoOpNextFn = () => null as unknown as NextFunction;

describe('authToken()', () => {
  it('should return undefined if no token is found', () => {
    const mockReq = {
      headers: {
        // No ‘authorization’ property.
      }
    } as Request;

    expect(parseToken(mockReq)).toBe(undefined);
  });

  it('should split the authorization header and return the token', () => {
    const mockReq: Partial<Request> = {
      headers: {
        authorization: 'Bearer h4ck3rs-sp33k_133t',
      }
    };

    expect(
      parseToken(mockReq as Request)
    ).toEqual('h4ck3rs-sp33k_133t');
  });
});

