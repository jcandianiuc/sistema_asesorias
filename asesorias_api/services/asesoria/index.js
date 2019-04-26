'use strict'

/*
* external modules
*/
const http = require('http')
const logger = require('winston')

/*
* local modules
*/
const config = require(`${basePath}/config`)
const app = require('./appServer')

const server = http.createServer(app.callback())

server.on('listening', () => {
  logger.info(`App is listening on port ${config.server.port}`)
})

server.on('error', (err) => {
  logger.error('Error happened during server start', err)
//     process.exit(1)
})

server.listen(config.server.port)
