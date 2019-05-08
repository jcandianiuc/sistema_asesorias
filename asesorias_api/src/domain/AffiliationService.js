const {basePath} = global;
const { AuthAssignment } = require(`${basePath}/src/domain/models`);

class AffiliationService {

  process(command) {
    const { user, role } = command;
    const authAssignment = new AuthAssignment;
    authAssignment.addRole(role);
    user.role = authAssignment;
  }
}

module.exports = AffiliationService;