const {basePath} = global;

const { EntitySchema } = require('typeorm');
const { Disponibilidad: DisponibilidadModel } = require(`${basePath}/src/domain/`);

const Disponibilidad = new EntitySchema({
  name: 'Disponibilidad',
  tableName: 'disponibilidad',
  target: DisponibilidadModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      nullable: false,
    },
    fecha: {
      type: Date,
      nullable: false,
    },
    tipoDisponibilidad: {
      type: String,
      nullable: false,
      name: 'tipo_asignacion',
    },
    timeInit: {
      type: Date,
      nullable: false,
      name: 'time_init',
    },
    timeFin: {
      type: Date,
      nullable: true,
      name: 'time_fin',
    },
  }
});

module.exports = Disponibilidad;