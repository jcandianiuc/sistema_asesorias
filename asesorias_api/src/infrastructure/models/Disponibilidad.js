const {basePath} = global;

const { EntitySchema } = require('typeorm');
const { Disponibilidad: DisponibilidadModel } = require(`${basePath}/src/domain/models`);

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
    idUsuario: {
      type: Number,
      nullable: false,
      name: 'id_usuario'
    },
    fecha: {
      type: Date,
      nullable: false,
    },
    status: {
      type: 'enum',
      nullable: false,
      enum: [
        'on',
        'off',
      ],
      default: 'on',
    },
    tipoDisponibilidad: {
      type: String,
      nullable: false,
      name: 'tipo_disponibilidad',
    },
    timeInit: {
      type: String,
      nullable: false,
      name: 'time_init',
    },
    timeFin: {
      type: String,
      nullable: true,
      name: 'time_fin',
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
  }
});

module.exports = Disponibilidad;