const { basePath } = global;

const { EntitySchema } = require('typeorm');
const { User: UserModel } = require(`${basePath}/src/domain/models`);

const User = new EntitySchema({
  name: 'User',
  tableName: 'user',
  target: UserModel,
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    nombre: {
      type: String,
      nullable: false,
    },
    paterno: {
      type: String,
      nullable: false,
    },
    materno: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      nullable: false,
    },
    birthday: {
      type: String,
      nullable: false,
    },
    telefono: {
      type: String,
      nullable: false,
    },
    sexo: {
      type: String,
      nullable: false,
    },
    engine: {
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
    authAssignment: {
      type: 'one-to-one',
      target: 'AuthAssignment',
      joinColumn: true
    }
  }
});

module.exports = User;
