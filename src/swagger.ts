import express from 'express';

/**
 * @TODO: Handle HTTPS too.
 */

/**
 * The spec file ‘openapi.yml’ is served from ‘src/openapi/’ directory,
 * and is publicly accessible from the url path ‘/openapi.yml’.
 *
 * The file is relative to the root url ‘/’, so we just need to pass
 * the path without a leading ‘/’.
 *
 * @TODO: Consider serving this file from another path, or at least make
 * sure we NEVER inadvertently place sensitive stuff in ‘src/openapi/ directory.
 */
const SWAGGER_OPENAPI_SPEC_FILE_PATH =
  process.env.SWAGGER_OPENAPI_SPEC_FILE_PATH || 'openapi.yml';


/**
 * Make sure you have the host bellow, or the one you decided to
 * use in the env var when starting the server in ‘/etc/hosts’. Ex, add
 * this line to ‘/etc/hosts’:
 *
 *   127.0.0.1 swagger.skillsapi.local
 */
const SWAGGER_HOST = process.env.SWAGGER_HOST || 'swagger.skillsapi.local';

const SWAGGER_PORT = Number(process.env.SWAGGER_PORT) || 3002;

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

const app = express();
app.use(express.static('src/openapi'));
app.use(express.static(pathToSwaggerUi));

const swaggerUIUrl = String.prototype.concat(
  'http://',
  SWAGGER_HOST,
  ':',
  String(SWAGGER_PORT),
  '/?url=',
  SWAGGER_OPENAPI_SPEC_FILE_PATH,
);

app.listen(
  SWAGGER_PORT,
  SWAGGER_HOST,
  function swaggerServerListener () {
    console.log(`Swagger UI on ${swaggerUIUrl}`);
  },
);

