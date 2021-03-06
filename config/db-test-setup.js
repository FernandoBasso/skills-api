//
// Initialize local MongoDB database and collections.
//
//
// USAGE:
//
//   $ mongo dbsetup.js
//
// or
//
//   $ mongo <host>:<port> dbsetup.js
//

const conn = new Mongo();
const db = conn.getDB('skillsapi_test');

const defaultCollation = {
  collation: {
    locale: 'en_US',
    strength: 1,
  },
};

db.createCollection('users', defaultCollation);
db.createCollection('skills', defaultCollation);
db.createCollection('users-skills', defaultCollation);

db.users.createIndex({ email: 1 });
db.skills.createIndex({ name: 1 });

//
// REFERENCES
// ==========
//
// • https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell
// • https://docs.mongodb.com/manual/core/index-case-insensitive/
// • https://docs.mongodb.com/manual/reference/collation
//
// IMPORTANT NOTES
// ---------------
//
// ‘strength’ 2 causes accented (diacritics) characters to be considered
// different. That is ‘jose’ and ‘josé’ would NOT be considered “equal”
// in a find operation (among others). Therefore, we use strength 1.
//
// When a collection is created and a collation is supplied, indexes and
// operations on that collection inherit that collation (unless overridden).
//
