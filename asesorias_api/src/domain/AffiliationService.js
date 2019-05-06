const {basePath} = global;
const { AuthAssignment } = require(`${basePath}/src/domain/models`);

class AffiliationService {

  process(command) {
    const { user } = command;
    const authAssignment = new AuthAssignment;
    authAssignment.addRole(command.role);
    user.authAssignment = authAssignment;
  }
}

module.exports = AffiliationService;