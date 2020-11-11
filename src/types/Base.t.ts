/**
 * All error related stuff MUST be inside an object with they key `error`
 * and the rest of the stuff nested inside this `error` key.
 */
interface IBaseError<T> {
  error: T;
}

/**
 * All data related stuff MUST be inside an object with they key `data`
 * and the rest of the stuff nested inside this `data` key.
 */
interface IBaseData<T> {
  data: T;
}

/**
 * A type guard to validate we have a `IBaseError`.
 */
const tgIsBaseError = (t: unknown): t is IBaseError<unknown> => {
  return (t as IBaseError<unknown>).error !== undefined;
};

/**
 * A type guard check we have a `IBaseData` (not an error).
 */
const tgIsBaseData = (t: unknown): t is IBaseData<unknown> => {
  return (t as IBaseData<unknown>).data !== undefined;
};

export {
  IBaseError,
  tgIsBaseError,
  IBaseData,
  tgIsBaseData,
};
