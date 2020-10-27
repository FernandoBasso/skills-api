# Express API

A CRUD API application that allows users to store their skills.

A project to research, study and practice building a RESTful API using Node, TypeScript, Express, MongoDB, JWT and other related libraries. Good practices, correct usage of HTTP status codes and compliance with the OpenAPI are also goals.

Example:

```
  user1:
    - JavaScript
      - topics, closures, lexical-scope, functions.
    - Ruby
    -   topics: Singleton, classes, methods, irb
```

Each topic can link to a description of what that person has done, their experience in that topic.


## Coding Conventions

- Name interfaces with an initial “I”, like `IUser` or `ICategoryExists`.
- Name type aliases with an initial “T”, like `TResponse` or `TErrorMessage`.
- Start Type Guard functions with `tg`, like `tgHasStatusCode` or `tgIsUser`.
- Name models like `UserModel` and `CategoryModel`. Use the singular form.
- Name controllers like `UsersController` and `CategoriesController`. The controller noun is usually in the plural.
- Favor a functional programming style and shy away from classes or OO (PS: I'm not against OO and classes, but for this project I'll stick to a FP style of programming).

