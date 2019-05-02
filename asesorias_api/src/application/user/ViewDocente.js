const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);
const Joi = require('joi');
/**
 * Valida que la id recibida tenga un formato correcto
 * @param {string} id
 */
function assertThatIdIsValid(id) {
  const joiError = Joi.number().min(1).validate(id).error;

  if (polyfill.isset(joiError)) {
    joiError.code = 400;
    throw joiError;
  }
}

class ViewDocente {
  /**
   * inicializa el repositorio se usara
   * @param {DocenteRepository} repository 
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
   * @returns {Docente}
   */
  async process(command) {
    const { id } = command;
    assertThatIdIsValid(id);
    return this.repository.byUuidOrFail(id);
  }
}

module.exports = ViewDocente;
