const Router = require('koa-router');

const docente = require('./docente');
const disponibilidad = require('./disponibilidad');

// Se añaden los routers por prefijo
const router = new Router();

router.use(docente.routes(), docente.allowedMethods());
router.use(disponibilidad.routes(), disponibilidad.allowedMethods());


// End points no agrupables
router.all('/', (ctx, next) => {
  ctx.body = {
    error: 0,
    flash: '¡Bienvenido a la API de Asesoria Ucaribe!',
    data: null,
  };
  next();
});

module.exports = router;
