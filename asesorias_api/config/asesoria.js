const common = require('./filters/common');
const logger = require('./filters/logger');
const server = require('./filters/server');

module.exports = { ...common, ...logger, ...server };
