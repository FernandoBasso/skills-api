import mongoose, {
  Connection,
} from 'mongoose';

const nodeEnv = process.env.NODE_ENV;

/**
 * Initializes the MongoDB connection at host and db name specified
 * in process.env.MONGO_HOST and process.env.MONGO_DBNAME. Returns
 * a function that closes the Mongo connection when invoked.
 */
export function dbInit(): Connection['close'] {
  const host = process.env.MONGO_HOST;
  const dbName = process.env.MONGO_DBNAME;

  mongoose.connect(`mongodb://${host}/${dbName}`);

  const db = mongoose.connection;

  /* eslint-disable no-console */
  db.on('error', console.error.bind(console, 'DB Connection Error'));
  db.once('open', function dbConnected() {
    if (nodeEnv === 'devel') {
      console.log('DB Connected Successfully!');
    }
  });
  /* eslint-enable no-console */

  ////
  // We cannot call close() without a receiver. It must be called
  // with its proper this value, thus we bind it the db object.
  //
  return db.close.bind(db);
}
