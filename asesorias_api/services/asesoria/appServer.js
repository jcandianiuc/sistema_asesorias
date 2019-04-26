'use strict'

const Koa = require('koa')
const router = require('./router');

/*
* Agregar mas middlewares aqui
* const middleware = require('./middleware')
*/

const app = new Koa()

/*
* Agregar middleweres aqui
*/
app.use(router.middleware())


module.exports = app;
