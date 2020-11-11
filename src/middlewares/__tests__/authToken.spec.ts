import { Response } from 'express';
import { IRequest } from 'src/types/express.t';
import { IUser } from 'src/types/User.t';
import { generateSessionToken } from 'src/libs/auth';
import {
  IHTTPUnprocessableEntity,
} from 'src/types/HTTPStatusCodes.t';

import { authToken } from '../authToken';

describe('authToken()', () => {
  it('should return http status 422 with no token is found', async () => {
    const spyNextFn = jest.fn();
    const spySend = jest.fn();

    const mockReq: Partial<IRequest> = {
      headers: {
        // Not providing any token on purpose.
      },
    };

    const mockResp: Partial<Response> = {
      send: spySend,
    };

    authToken(mockReq as IRequest, mockResp as Response, spyNextFn);

    expect(spyNextFn).toHaveBeenCalledTimes(0);
    expect(
      mockResp.send,
    ).toHaveBeenCalledWith({
      status: 422, message: 'Unprocessable Entity',
    } as IHTTPUnprocessableEntity);
  });

  it('should fail if a token verification fails', async () => {
    const spyNextFn = jest.fn();
    const spySend = jest.fn();

    const unsignedAndInvalidToken = 'h4ck3rs-sp33k_133t';

    const mockReq: Partial<IRequest> = {
      headers: {
        authorization: `Bearer ${unsignedAndInvalidToken}`,
      },
    };

    const mockResp: Partial<Response> = {
      send: spySend,
    };

    authToken(mockReq as IRequest, mockResp as Response, spyNextFn);

    expect(mockResp.send).toHaveBeenCalledWith({
      status: 401,
      message: 'Unauthenticated',
    });
    expect(spyNextFn).toHaveBeenCalledTimes(0);
  });

  it('should pass if token is correctly verified', async () => {
    const spyNextFn = jest.fn();
    const spySend = jest.fn();

    const user: IUser = {
      name: 'Ahsoka Tano',
      email: 'ahsoka@theforce.dev',
      password: 's3cr37',
    };

    const properlySignedToken = generateSessionToken(user);

    const mockReq: Partial<IRequest> = {
      headers: {
        authorization: `Bearer ${properlySignedToken}`,
      },
    };

    const mockResp: Partial<Response> = {
      send: spySend,
    };

    authToken(mockReq as IRequest, mockResp as Response, spyNextFn);

    expect(spySend).not.toHaveBeenCalled();
    expect(spyNextFn).toHaveBeenCalledTimes(1);
  });
});
