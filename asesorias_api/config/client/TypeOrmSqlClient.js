const { basePath } = global;
const { getConnectionManager } = require('typeorm');

const appName = process.env.PROCESS_TYPE;
let logType;

if (process.env.NODE_ENV === 'debug') {
  logType = 'all';
} else if (process.env.NODE_ENV === 'development') {
  logType = ['error', 'warn'];
} else {
  logType = ['error'];
}

const pool = getConnectionManager().create({
  name: 'default',
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    `${basePath}/src/infrastructure/models/**/*.js`,
  ],
  synchronize: false,
  logging: logType,
});

pool.connect();

module.exports = pool;
