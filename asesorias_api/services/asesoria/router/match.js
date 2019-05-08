const Router = require('koa-router');
const koaBody = require('koa-body');
const Joi = require('joi');
const logger = require('winston');
const { basePath } = global;
const { TypeOrmSqlClient: db } = require(`${basePath}/config/client`);

const { CreateMatch, ViewMatch, FetchMatches } = require(`${basePath}/src/application/match`);
const { MatchRepository } = require(`${basePath}/src/infrastructure/repositories/typeorm`);

const { polyfill, filterAdapter } = require(`${basePath}/helpers`);

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
  prefix: '/matches'
});

router.get('/', async (ctx, next) => {
  let response;

  try {
    const repository = new MatchRepository(db);
    const service = new FetchMatches(repository);

    const command = {
      ...ctx.request.body,
      ...ctx.params,
      ...filterAdapter.adapt(ctx.query)
    };

    entity = await service.process(command);

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
    const repository = new MatchRepository(db);
    const service = new ViewMatch(repository);

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
    const repository = new MatchRepository(db);
    const service = new CreateMatch(repository);
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