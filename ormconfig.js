
const process = require('process');
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

module.exports = {
  "type": "mysql",
  "host": MYSQL_HOST,
  "port": 3306,
  "username": MYSQL_USER,
  "password": MYSQL_PASSWORD,
  "database": MYSQL_DATABASE,
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": false,
  "cli": {
    "migrationsDir": "src/migration"
  }
}