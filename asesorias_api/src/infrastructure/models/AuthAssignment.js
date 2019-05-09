const { basePath } = global;

const { EntitySchema } = require('typeorm');
const { AuthAssignment: AuthAssignmentModel } = require(`${basePath}/src/domain/models`);

const AuthAssignment = new EntitySchema({
  name: 'AuthAssignment',
  tableName: 'auth_assignment',
  target: AuthAssignmentModel,
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    itemName: {
      type: 'integer',
      nullable: false,
      name: 'item_name',
    },
    userId: {
      type: 'integer',
      nullable: false,
      name: 'user_id',
    },
    createdAt: {
      type: String,
      nullable: false,
      name: 'created_at',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});

module.exports = AuthAssignment;