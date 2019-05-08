const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);

function assertThatPasswordIsCorrect(usr, password) {
  if (!usr.validatePassword(password)) {
    const err = new Error('La contraseña es incorrecta');
    err.code = 400;
    throw err;
  }
}
class ViewUser {
  /**
   * inicializa el repositorio se usara
   * @param {UserRepository} repository 
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Método que se encarga de solicitar un docente
   * por su ID, validando que el parametro tenga el formato adecuado
   * 
   * @throws {Error}
   * @param {string} command - Identificador del docente
   * @returns {User}
   */
  async process(command) {
    const { email, password } = command;
    const user = await this.repository.byEmailOrFail(email);
    assertThatPasswordIsCorrect(user, password);
    return user;
  }

  async find(command) {
    return this.repository.find(command);
  }
}

module.exports = ViewUser;
