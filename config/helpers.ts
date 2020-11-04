import { resolve } from 'path';

/**
 * Returns the path to an env file.
 *
 * • .config/.env.devel
 * • .config/.env.test
 *
 * @return {string}
 */
export function getEnvFile(): string {
  const nodeEnv = process.env.NODE_ENV || 'devel';
  return resolve(__dirname, `.env.${nodeEnv}`);
};

