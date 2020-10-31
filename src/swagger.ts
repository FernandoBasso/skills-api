import express from 'express';
import { readFileSync } from 'fs';
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

//
// @TODO: Handle HTTPS too.
//

////
// The spec file ‘openapi.yml’ is served from ‘src/openapi/’ directory,
// and is publicly accessible from the url path ‘/openapi.yml’.
//
// The file is relative to the root url ‘/’, so we just need to pass
// the path without a leading ‘/’.
//
// @TODO: Consider serving this file from another path, or at least make
// sure we NEVER inadvertently place sensitive stuff in ‘src/openapi/ directory.
//
const SWAGGER_OPENAPI_SPEC_FILE_PATH =
  process.env.SWAGGER_OPENAPI_SPEC_FILE_PATH || 'openapi.yml';


////
// Make sure you have the host bellow, or the one you decided to
// use in the env var when starting the server in ‘/etc/hosts’. Ex, add
// this line to ‘/etc/hosts’:
//
//   127.0.0.1 swagger.skillsapi.local
//
const SWAGGER_HOST = process.env.SWAGGER_HOST || 'swagger.skillsapi.local';

const SWAGGER_PORT = Number(process.env.SWAGGER_PORT) || 3002;

////
// Since we are using ‘swagger-ui-dist’ we need to replace the pets URL with
// the location of our own ‘openapi.yml’ URL when serving the index.html file.
//
// https://github.com/swagger-api/swagger-ui/issues/4624#issuecomment-396439809
//
const html = readFileSync(`${pathToSwaggerUi}/index.html`)
  .toString()
  .replace(
    'https://petstore.swagger.io/v2/swagger.json',
    `http://${SWAGGER_HOST}:${SWAGGER_PORT}/${SWAGGER_OPENAPI_SPEC_FILE_PATH}`,
  );

const app = express();

////
// We need to serve the directory where the ‘openapi.yml’ file is located so
// Swagger UI can fetch and make use of it.
//
app.use(express.static('src/openapi'));

////
// Now we serve the root path _and_ ‘/index.html’ with our new, updated
// html content that contains the URL to our own ‘openapi.yml’ spec file.
//
app.get('/', (req, res) => res.send(html));
app.get('/index.html', (req, res) => res.send(html));

////
// Finally serve Swagger UI.
//
app.use(express.static(pathToSwaggerUi));

////
// Our URL string.
//
const swaggerUIUrl = String.prototype.concat(
  'http://',
  SWAGGER_HOST,
  ':',
  String(SWAGGER_PORT),
  `/?url=${SWAGGER_OPENAPI_SPEC_FILE_PATH}`,
);

////
// Start the server at the specified host and port and also log the Swagger UI
// URL so we know where to point our browsers to.
//
app.listen(
  SWAGGER_PORT,
  SWAGGER_HOST,
  function swaggerServerListener () {
    console.log(`Swagger UI on ${swaggerUIUrl}`);
  },
);

