'use strict'

const joi = require('joi')
const winston = require('winston')

const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
    .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  logger: {
    file: {
      level: envVars.LOGGER_LEVEL,
      filename: `${process.env.LOG_DIR}/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      enabled: envVars.LOGGER_ENABLED,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  },
};
winston.level = config.logger.level
if (!config.logger.enabled) {
  winston.remove(winston.transports.Console)
}

module.exports = config
