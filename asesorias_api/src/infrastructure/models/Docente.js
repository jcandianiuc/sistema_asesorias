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
      type: Number,
      nullable: false,
      name: 'id_usuario',
      unsigned: true,
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
  relations: {
    abstract: {
      type: 'one-to-one',
      target: 'User',
      cascade: true,
      joinColumn: {
        name: 'id_usuario'
      }
    }
  }
});

module.exports = Docente;
