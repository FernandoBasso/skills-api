# Express API

- [Express API](#express-api)
  - [Setup](#setup)
  - [API Server](#api-server)
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
$ nvm install < .nvmrc
$ npm install
```

Take a look at the comments in `config/.env.example` as well for instructions on the local development environment configs necessary to run the project.


## API Server

Add this line to `/etc/hosts`:

```
127.0.0.1 http://skillsapi.local
```

Then run:

```
$ npm run api
```


## OpenAPI and Swagger

Add this line to `/etc/hosts`:

```
# /etc/hosts file.
127.0.0.1 http://swagger.skillsapi.local
```

Run

```
$ npm run swaggerui
```

Then point your browser to the URL http://swagger.skillsapi.local:3002/?url=openapi.yml which was logged on the terminal.

It is also possible to start the server with a different host and port. Just make sure that whatever host you pass as an env var also exists in `/etc/hosts` as an alias to 127.0.0.1 (as exemplified above):

```
$ SWAGGER_HOST=myswaggerui.local SWAGGER_PORT=8432 npm run swagger
```

Now you can point your browser to http://myswaggerui.local:8432/?url=openapi.yml, as logged on your terminal.


## Coding Conventions

- Name interfaces with an initial “I”, like `IUser` or `ICategoryExists`.
- Name type aliases with an initial “T”, like `TResponse` or `TErrorMessage`.
- Start Type Guard functions with `tg`, like `tgHasStatusCode` or `tgIsUser`.
- Name models like `UserModel` and `CategoryModel`. Use the singular form.
- Name controllers like `UsersController` and `CategoriesController`. The controller noun is usually in the plural.
- Favor a functional programming style and shy away from classes or OO (PS: I'm not against OO and classes, but for this project I'll stick to a FP style of programming).
- All data is returned in an object `{ data: <actual data from MongoDB> }` and all error responses in an object like `{ error: <error object> }`. Check `IBaseData` and `IBaseError` on `general.t.ts`.

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

