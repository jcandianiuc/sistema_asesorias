const Router = require('koa-router');
const logger = require('winston');

const { basePath } = global;
const { TypeOrmSqlClient: db } = require(`${basePath}/config/client`);
// const { DocenteRepository } = require(`${basePath}/src/infrastructure/repositories/typeorm`);
// const {
//   ViewDocente,
// } = require(`${basePath}/src/application`);


// /**
//  *
//  * @param {Error} err
//  */
// function makeErrorResponse(err) {
//   logger.error(err.message + err.stack);
//   const flash = err.isJoi ? getJoiFlash(err) : err.message;

//   return {
//     error: err.code,
//     flash,
//     data: {},
//   };
// }

const router = new Router({
  prefix: '/docentes',
});

// router.get('/:uuid', async (ctx, next) => {
//   let response;
//   let code;

//   const data = {
//     ...ctx.request.body,
//     ...ctx.params,
//     ...ctx.query,
//   };

//   try {
//     const repository = new DocenteRepository(db);
//     const service = new ViewDocente(
//       repository,
//     );

//     const result = await service.handle(data);

//     code = 200;
//     response = {
//       error: 0,
//       flash: 'éxito',
//       data: result.tranfers,
//       summary: {
//         totalCount: result.total,
//       },
//     };
//   } catch (err) {
//     code = 404;
//     response = makeErrorResponse(err);
//   } finally {
//     ctx.status = code;
//     ctx.body = response;
//     next();
//   }
// });

// router.put('/:uuid', koaBody(), async (ctx, next) => {
//     let response;
//     let code;
  
//     const data = {
//       ...ctx.request.body,
//       ...ctx.params,
//     };
  
//     try {
//       const repository = new DocenteRepository(db);
//       const service = new CreateDocente(
//         repository
//       );
  
//       const docente = await service.handle(data);
  
//       code = 201;
//       response = {
//         error: 0,
//         flash: 'Operacion exitosa',
//         data: {
//           id: docente.uuid || null,
//         },
//       };
//       code = docente ? 201 : 400;
//     } catch (err) {
//       code = err.isJoi ? 400 : 500;
//       response = makeErrorResponse(err);
//     } finally {
//       ctx.status = code;
//       ctx.body = response;
//       next();
//     }
//   });

module.exports = router;
