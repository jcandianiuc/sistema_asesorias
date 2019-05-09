const { basePath } = global;

const { EntitySchema } = require('typeorm');
const { User: UserModel } = require(`${basePath}/src/domain/models`);
const { encryptor} =require(`${basePath}/helpers`);

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
    password: {
      type: String,
      nullable: false,
      transformer: {
        to: encryptor.encrypt,
        from: encryptor.decrypt,
      },
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
  },
  relations: {
    roles: {
      type: 'one-to-many',
      target: 'AuthAssignment',
      cascade: true,
      joinColumn: {
        name: 'id',
      },
      inverseSide: 'user',
    }
  }
});

module.exports = User;
