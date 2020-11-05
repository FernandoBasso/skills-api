import mongoose from 'mongoose';

export function dbInit () {
  mongoose.connect('mongodb://localhost/skillsapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'DB Connection Error'));
  db.once('open', function dbConnected () {
    console.log('DB Connected Successfully!');
  });
};
