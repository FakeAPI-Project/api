const path = require('path');

module.exports = {
  development: {
    username: 'admin',
    password: 'admin',
    database: 'fakeapi',
    storage: path.join(path.resolve(__dirname), '../../db/database.db'),
    host: '127.0.0.1',
    port: 3306,
    dialect: 'sqlite',
  },
  test: {
    username: 'admin',
    password: 'admin',
    database: 'fakeapi',
    storage: path.join(path.resolve(__dirname), '../../db/database.db'),
    host: '127.0.0.1',
    port: 3306,
    dialect: 'sqlite',
  },
  production: {
    username: 'admin',
    password: 'admin',
    database: 'fakeapi',
    storage: path.join(path.resolve(__dirname), '../../db/database.db'),
    host: '127.0.0.1',
    port: 3306,
    dialect: 'sqlite',
  },
};
