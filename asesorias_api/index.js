/* eslint-disable global-require */


global.basePath = __dirname;

const logger = require('winston');

logger.add(new logger.transports.Console());

if (process.env.NODE_ENV === 'local') {
  require('dotenv').config({path: `${basePath}/.env`});
}

const type = process.env.PROCESS_TYPE;

logger.info(`Starting '${type}' process`, { pid: process.pid });

if (type === 'asesoria') {
  require('./services/asesoria');
} else {
  throw new Error(`${type} is an unsupported process type. 
    Use one of: 'asesoria'
`);
}
