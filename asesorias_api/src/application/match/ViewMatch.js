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

class ViewMatch {
  /**
   * inicializa el repositorio se usara
   * @param {MatchRepository} repository 
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Método que se encarga de solicitar la disponibilidad
   * por su ID, validando que el parametro tenga el formato adecuado
   * 
   * @throws {Error}
   * @param {string} command - Identificador de disponibilidad
   * @returns {Match}
   */
  async process(command) {
    const { id } = command;
    assertThatIdIsValid(id);
    return this.repository.byUuidOrFail(id);
  }
}

module.exports = ViewMatch;
