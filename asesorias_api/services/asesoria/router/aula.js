const Router = require('koa-router');
const koaBody = require('koa-body');
const Joi = require('joi');
const logger = require('winston');
const { basePath } = global;
const { TypeOrmSqlClient: db } = require(`${basePath}/config/client`);

const { FetchAulas } = require(`${basePath}/src/application/resources`);
const { AulaRepository } = require(`${basePath}/src/infrastructure/repositories/typeorm`);

const { filterAdapter } = require(`${basePath}/helpers`);

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
  prefix: '/aulas'
});

router.get('/', async (ctx, next) => {
  let response;

  try {
    const repository = new AulaRepository(db);
    const service = new FetchAulas(repository);

    const data = {
      ...ctx.request.body,
      ...ctx.params,
      ...filterAdapter.adapt(ctx.query)
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

module.exports = router;