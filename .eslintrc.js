module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    ////
    // The developer should know best when it looks better to use or not
    // use curly braces body of an arrow function and if should be on a
    // single line or not.
    //
    'arrow-body-style': 0,

    ////
    // A rule as ALWAYS/NEVER use parens is too inflexible. Depending
    // on the situation it makes not sense to force parens, while in
    // other cases it makes no sense to force the developer not to use
    // the parens.
    //
    'arrow-parens': 0,

    ////
    // Sometimes there is just a single export on a file, an the liter
    // wants us to make it a default export, even though the fill will
    // end up with many other exports overtime, causing one to have to
    // refactor and change in the places the default export was imported.
    // No, let's just allow named exports even for a single exported
    // thing from a module.
    //
    'import/prefer-default-export': 0,

    ////
    // No. It is sometimes better to use good old function expressions with
    // proper names which help understand what they do and help the logging
    // of errors and stack trackes.
    //
    'prefer-arrow-callback': 0,

    ////
    // Let's allow ////, //----, //==== and /******/ comments. Useful for
    // creating headers and sections.
    //
    'spaced-comment': ['error', 'always', { exceptions: ['/', '-', '+', '=', '*'] }],

    ////
    // MongoDB needs “_id”...
    //
    'no-underscore-dangle': ['error', { allow: ['_id'] }]
  }
};
