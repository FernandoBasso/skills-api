# Express API

- [Express API](#express-api)
  - [Setup](#setup)
  - [API Server](#api-server)
  - [OpenAPI and Swagger](#openapi-and-swagger)
  - [Coding Conventions](#coding-conventions)
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


## Ideas

**NOTE**: This is a brainstorming section as of now.

Example:

```
  user1:
    - JavaScript
      - topics, closures, - [Express API](#express-api)
  - [OpenAPI and Swagger](#openapi-and-swagger)
  - [Coding Conventions](#coding-conventions)lexical-scope, functions.
    - Ruby,
    -   topics: Singleton, classes, methods, irb
```

Each topic can link to a description of what that person has done, their experience in that topic.

