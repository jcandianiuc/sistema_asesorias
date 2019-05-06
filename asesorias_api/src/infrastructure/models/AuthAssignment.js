const { basePath } = global;

const { EntitySchema } = require('typeorm');
const { AuthAssignment: AuthAssignmentModel } = require(`${basePath}/src/domain/models`);

const AuthAssignment = new EntitySchema({
  name: 'AuthAssignment',
  tableName: 'auth_assignment',
  target: AuthAssignmentModel,
  columns: {
    itemName: {
      type: 'integer',
      primary: true,
      nullable: false,
      name: 'item_name',
    },
    userId: {
      type: String,
      nullable: false,
      name: 'user_id',
    },
    createdAt: {
      type: String,
      nullable: false,
      name: 'created_at',
    },
  },
});

module.exports = AuthAssignment;