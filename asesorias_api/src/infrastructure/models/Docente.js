const {basePath} = global;

const { EntitySchema } = require('typeorm');
const { Docente: DocenteModel } = require(`${basePath}/src/domain/models`);

const Docente = new EntitySchema({
  name: 'Docente',
  tableName: 'docente',
  target: DocenteModel,
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    idUsuario: {
      type: String,
      nullable: false,
      name: 'id_usuario',
    },
    createdAt: {
      type: String,
      nullable: false,
      name: 'created_at',
    },
    createdBy: {
      type: String,
      nullable: false,
      name: 'created_by',
    },
  },
  // relations: {
  //   usuario: {
  //     type: 'one-to-one',
  //     target: 'User',
  //     joinColumn: true
  //   }
  // }
});

module.exports = Docente;
