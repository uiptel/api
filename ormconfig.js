
const { DB_URL } = process.env;

module.exports = {
  "type": DB_URL.split('://')[0],
  "url": DB_URL,
  "migrations": ["dist/src/migration/*.js"],
  "synchronize": false,
  "cli": {
    "migrationsDir": "dist/src/migration"
  }
};
