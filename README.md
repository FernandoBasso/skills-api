# Express API

- [Express API](#express-api)
  - [Setup](#setup)
  - [API Server](#api-server)
  - [Testing](#testing)
  - [OpenAPI and Swagger](#openapi-and-swagger)
  - [Coding Conventions](#coding-conventions)
  - [Docs, Wiki](#docs-wiki)
  - [Ideas](#ideas)

A CRUD API application that allows users to store their skills. It is a project to research, study and practice building a RESTful OpenAPI-compliant API using Node, TypeScript, Express, MongoDB, JWT, Swagger and other related libraries. Good practices and correct usage of HTTP status codes are a must while implementing this project.

**NOTE**: The main repository where issues and discussions are held is the [Skills-API on Gitlab](https://gitlab.com/fernandobasso/skills-api). The [Github repo](https://github.com/FernandoBasso/skills-api) is just a mirror.

**NOTE**: All the commands should be run from the root directory of the project unless otherwise noted.


## Setup

Install [nvm](https://github.com/nvm-sh/nvm) then run:

```
nvm install < .nvmrc
npm install
```

Setup the `config/.env.devel` and `config/.env.test` files:

```
cat config/.env.example | tee config/.env.{devel,test}
```

Take a look at the comments in generated files  for instructions on the local development environment configs necessary to run the project. Make sure you review the keys (they are documented) and set the appropriate stuff, like mongo host, db name, etc.


## API Server

Add this line to `/etc/hosts`:

```
127.0.0.1 http://skillsapi.local
```

Then run:

```shell-session
npm run api
```

## Testing

We have unit tests and integration tests (so far). The unit tests use Jest to test specific TypeScript code. The integration tests run on Jest with SuperTest and focus on the API endpoints. There may be some exceptions, but that is the main idea.

Run unit tests:

```
npm run test:unit
```

Or:

```
npm run test:unit -- --watch --verbose --coverage
```

Run integration tests:

```
npm run test:integration
```

## OpenAPI and Swagger

Add this line to `/etc/hosts`:

```
# /etc/hosts file.
127.0.0.1 http://swagger.skillsapi.local
```

Run

```shell-session
npm run swaggerui
```

Then point your browser to the URL http://swagger.skillsapi.local:3002/?url=openapi.yml which was logged on the terminal.

It is also possible to start the server with a different host and port. Just make sure that whatever host you pass as an env var also exists in `/etc/hosts` as an alias to 127.0.0.1 (as exemplified above):

```shell-session
SWAGGER_HOST=myswaggerui.local SWAGGER_PORT=8432 npm run swagger
```

Now you can point your browser to http://myswaggerui.local:8432/?url=openapi.yml, as logged on your terminal.


## Coding Conventions

- Name interfaces with an initial “I”, like `IUser` or `ICategoryExists`.
- Name type aliases with an initial “T”, like `TResponse` or `TErrorMessage`.
- Start Type Guard functions with `tg`, like `tgHasStatusCode` or `tgIsUser`.
- Name models like `UserModel` and `CategoryModel`. Use the singular form.
- Name controllers like `UsersController` and `CategoriesController`. The controller noun is usually in the plural.
- Models either return the object with the data stored/updated/etc or throw an appropriate exception for each class of error.
- All data is returned in an object `{ data: <actual data from MongoDB> }` and all error responses in an object like `{ error: <error object> }`. Check `IBaseData` and `IBaseError` on `general.t.ts`.



## Controllers and Models Responsibilities

The model knows why something went wrong (not found, invalid arguments, etc.) but according to web searches ([1](https://softwareengineering.stackexchange.com/questions/312674/is-model-a-better-place-to-set-http-status-code)) it is wrong to determine which HTTP Status Codes to respond with from the models. They say the controllers should decide on the status codes to respond with.

Models could throw exceptions like `IllegalArgumentException` or `NoSuchEntityException` which would map to 422, 404, etc. status codes in the controller.

So, our models either return the successful data or throw exceptions. The exceptions contain a message with a precise reason for the failure. The controllers handle those exceptions and translate them to appropriate HTTP Status Codes, sending the status code, the status HTTP Message, and the business logic message  from the Model exception message. Example:

Model:
```
throw new Exception('User with email <email> already exists');
```

Controller:
```res.send(409).send({
respose.status(409).send({
  status: 409,
  message: 'Conflict',
  detailedMessage: 'User with email <email> already exists'
});
```



## Docs, Wiki

The Gitlab Wiki is a separate project/repository. We handle it inside the `docs/` directory in the root of the project so it is easy to navigate to its files document stuff without having to open an editor in a different directory in our local machine.

See the [Home Wiki Page](https://gitlab.com/fernandobasso/skills-api/-/wikis/Home) for more details.

## Ideas

**NOTE**: This is a brainstorming section as of now.

Example:

```
user1:
- JavaScript
  - topics: closures, lexical-scope, functions, generators
- Ruby
  - topics: Singleton, classes, methods, irb, C Extensions

```

Each topic can link to a description of what that person has done, their experience in that topic.

