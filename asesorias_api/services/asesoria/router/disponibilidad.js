const Router = require('koa-router');
const koaBody = require('koa-body');
const Joi = require('joi');
const logger = require('winston');
const { basePath } = global;
const { TypeOrmSqlClient: db } = require(`${basePath}/config/client`);

const { CreateDisponibilidad, ViewDisponibilidad, FetchDisponibilidades } = require(`${basePath}/src/application/availability`);
const { AvailabilityRepository } = require(`${basePath}/src/infrastructure/repositories/typeorm`);

const { polyfill } = require(`${basePath}/helpers`);

function getJoiFlash(error) {
  let msg = '';

  error.details.forEach((element) => {
    msg += ` ${element.message}`;
  });

  return msg;
}

function makeErrorResponse(err) {
  logger.error(err.message + err.stack);
  const flash = err.isJoi ? getJoiFlash(err) : err.message;

  return {
    error: err.code,
    flash,
    data: {},
  };
}

const router = new Router({
  prefix: '/availabilities'
});

router.get('/', async (ctx, next) => {
  let response;

  try {
    const repository = new AvailabilityRepository(db);
    const service = new FetchDisponibilidades(repository);

    const data = {
      ...ctx.request.body,
      ...ctx.params,
      ...ctx.query,
    };

    entity = await service.process(data);

    code = 200;
    response = {
      error: 0,
      flash: 'Ok',
      data: entity,
      summary: {
        totalCount: entity.total,
      },
    };
  } catch (err) {
    code = 404;
    response = makeErrorResponse(err);
  } finally {
    ctx.status = code;
    ctx.body = response;
    next();
  }
});

router.get('/:id', async (ctx, next) => {
  let response;

  try {
    const repository = new AvailabilityRepository(db);
    const service = new ViewDisponibilidad(repository);

    const data = {
      ...ctx.request.body,
      ...ctx.params,
      ...ctx.query,
    };

    entity = await service.process(data);

    code = 200;
    response = {
      error: 0,
      flash: 'Ok',
      data: entity,
      summary: {
        totalCount: entity.total,
      },
    };
  } catch (err) {
    code = 404;
    response = makeErrorResponse(err);
  } finally {
    ctx.status = code;
    ctx.body = response;
    next();
  }
});

router.post('/', koaBody(), async function (ctx, next) {
  let response;

  const data = {
    ...ctx.request.body,
    ...ctx.params,
    ...ctx.query,
  };

  try {
    // TODO: Agregar validadores
    const repository = new AvailabilityRepository(db);
    const service = new CreateDisponibilidad(repository);
    const disponbilidad = await service.process(data);

    code = 201;
    response = {
      error: 0,
      flash: 'Successful!',
      data: {
        id: disponbilidad.id || null,
      },
    };
    code = disponbilidad ? 201 : 400;
  } catch (err) {
    code = 404;
    response = makeErrorResponse(err);
  } finally {
    ctx.status = code;
    ctx.body = response;
    next();
  }
});

module.exports = router;