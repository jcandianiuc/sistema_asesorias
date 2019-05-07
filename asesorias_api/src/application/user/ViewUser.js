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
    const { id } = command;
    return this.repository.byUuidOrFail(id);
  }

  async find(command) {
    return this.repository.find(command);
  }
}

module.exports = ViewUser;
