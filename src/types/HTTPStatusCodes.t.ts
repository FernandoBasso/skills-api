//////////////////////////////////////////////////////////////////////////////
// Standard HTTP Statuses
//

/**
 * All status responses must extend this message type.
 */
interface IStatusMessage {
  message: string;
}

/**
 * 422: Unprocessable Entity.
 */
export interface IHTTPUnprocessableEntity extends IStatusMessage {
  status: 422;
  message: string;
}

/**
 * 409 Conflict.
 */
export interface IHTTPConflict extends IStatusMessage {
  status: 409;
}

/**
 * 404 Not Found.
 */
export interface IHTTPNotFound extends IStatusMessage {
  status: 404;
}

/**
 * 401 Unauthenticated.
 */
export interface IUnauthenticated extends IStatusMessage {
  status: 401;
}

//////////////////////////////////////////////////////////////////////////////
// Type Guards
//
// These type guards are sometimes useful with the statuses defined above.
//

/**
 * A Type Guard to check whether the given ‘t’ parameter
 * is an object that contains the ‘status’ property.
 */
export function tgHasStatusCode(t: unknown): t is { status: number } {
  return (t as { status: number }).status !== undefined;
}
