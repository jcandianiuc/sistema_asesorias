const {basePath} = global;

const { EntitySchema } = require('typeorm');
const { Match: MatchModel } = require(`${basePath}/src/domain/models`);

const Match = new EntitySchema({
  name: 'Match',
  tableName: 'match',
  target: MatchModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      nullable: false,
    },
    idAlumno: {
      type: Number,
      nullable: false,
      name: 'id_alumno'
    },
    idDocente: {
      type: Number,
      nullable: false,
      name: 'id_docente'
    },
    idAula: {
      type: Number,
      nullable: false,
      name: 'id_aula'
    },
    horas: {
      type: Number,
      nullable: false,
    },
    fecha: {
      type: Date,
      nullable: false,
    },
    extras: {
      type: String,
      nullable: false
    },
    // createdAt: {
    //   type: Date,
    //   nullable: false,
    //   name: 'created_at',
    // },
    // createdBy: {
    //   type: String,
    //   nullable: false,
    //   name: 'created_by',
    // },
  }
});

module.exports = Match;