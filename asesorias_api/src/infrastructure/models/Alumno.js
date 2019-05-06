const {basePath} = global;

const { EntitySchema } = require('typeorm');
const { Alumno: AlumnoModel } = require(`${basePath}/src/domain/models`);

const Alumno = new EntitySchema({
  name: 'Alumno',
  tableName: 'alumno',
  target: AlumnoModel,
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
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
  // relations: {
  //   user: {
  //     type: 'one-to-one',
  //     target: 'User',
  //     joinColumn: true
  //   }
  // }
});

module.exports = Alumno;
