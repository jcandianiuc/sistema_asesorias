const Router = require('koa-router');
const logger = require('winston');
const passport = require('passport');
const auth = require('./auth');

const { basePath } = global;
const { TypeOrmSqlClient: db } = require(`${basePath}/config/client`);
const { ViewUser } = require(`${basePath}/src/application/user`);
const { UserRepository } = require(`${basePath}/src/infrastructure/repositories/typeorm`);

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
  prefix: '/user'
});

router.get('/login', async (ctx, next) => {
  let response;

  try {
    const repository = new UserRepository(db);
    const service = new ViewUser(repository);

    const command = {
      ...ctx.request.body,
      ...ctx.params,
      ...ctx.query,
    };

    const entity = await service.process(command)

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
