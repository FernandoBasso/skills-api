import { app } from 'src/index';
import { dbInit } from 'src/db';

////
// Since ‘.dev’ has become part of valid TLDs, (about 2017), we can't
// develop with local URLs like ‘myproj.dev’ because the browser redirects
// to HTTPS and we are not always locally running HTTPS. Looks like
// local URLs ending with ‘.local’ are OK.
//
const HOST = process.env.HOST || 'skillsapi.local';
const PORT = Number(process.env.PORT) || 3001;

////
// Init the Mongoose/MongoDB Database Connection.
//
dbInit();

app.listen(PORT, HOST, function listener () {
  console.log(`App listening on http://${HOST}:${PORT}`);
});
