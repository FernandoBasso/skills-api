/**
 * To sign up (register) the user needs to provied an
 * email and a password.
 */
export interface IUserSignUp {
  email: string;
  password: string;
  encryptedPassword?: string;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  encryptedPassword?: string;
};

interface IStatusCode {
  status: number;
}

export interface IUserInvalid {
  // 422: Unprocessable Entity.
  status: 422;
  message: string;
};

export interface IUserExists {
  // 409: Conflict.
  status: 409;
  message: string;
};

export interface IUserNotFound {
  // 404: Not Found.
  status: 404;
  message: string;
};

/**
 * 401 Unauthenticated.
 */
export interface IUnauthenticated {
  // 401: Unauthenticated.
  status: 401;
  message: string;
};

/**
 * A Type Guard to check whether the given ‘t’ parameter
 * is an object that contains the ‘status’ property.
 */
export function tgHasStatusCode(t: any): t is IStatusCode {
  return (t as IStatusCode).status !== undefined;
}

