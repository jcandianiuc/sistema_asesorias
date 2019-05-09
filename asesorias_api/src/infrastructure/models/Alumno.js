const {basePath} = global;

const { EntitySchema } = require('typeorm');
const { Alumno: AlumnoModel } = require(`${basePath}/src/domain/models`);

const Alumno = new EntitySchema({
  name: 'Alumno',
  tableName: 'alumno',
  target: AlumnoModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    idUsuario: {
      type: Number,
      nullable: false,
      name: 'id_usuario',
      unsigned: true,
    },
    matricula: {
      type: String,
      nullable: false,
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

module.exports = Alumno;
