'use strict'

const Koa = require('koa')
const router = require('./router');

/*
* Agregar mas middlewares aqui
* const middleware = require('./middleware')
*/

const app = new Koa()

// migrar a midleware
app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
});

app.listen(3000);
/*
* Agregar middleweres aqui
*/
// app.use(router.middleware())


module.exports = app;
