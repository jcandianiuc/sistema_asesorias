const Router = require('koa-router');
const koaBody = require('koa-body');
const Joi = require('joi');
const logger = require('winston');
const { basePath } = global;
const { TypeOrmSqlClient: db } = require(`${basePath}/config/client`);

const { FetchAlumnos, ViewAlumno, CreateAlumno } = require(`${basePath}/src/application/user`);
const { AlumnoRepository } = require(`${basePath}/src/infrastructure/repositories/typeorm`);

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
  prefix: '/alumnos'
});

router.get('/', async (ctx, next) => {
  let response;

  try {
    const repository = new AlumnoRepository(db);
    const service = new FetchAlumnos(repository);

    const filters = filterAdapter.adapt(ctx.query);

    const collection = await service.process(filters);

    code = 200;
    response = {
      error: 0,
      flash: 'Ok',
      data: collection.items,
      summary: {
        totalCount: collection.total,
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
    const repository = new AlumnoRepository(db);
    const service = new ViewAlumno(repository);

    const filters = filterAdapter.adapt({
      ...ctx.params,
      ...ctx.query,
    });

    entity = await service.process(filters);

    code = 200;
    response = {
      error: 0,
      flash: 'Ok',
      data: entity,
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
    const repository = new AlumnoRepository(db);
    const service = new CreateAlumno(repository);
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