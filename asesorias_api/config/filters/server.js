'use strict'

const Joi = require('joi')

const envVarsSchema = Joi.object().keys({
  PORT: Joi.number()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  server: {
    port: envVars.PORT
  }
}

module.exports = config
