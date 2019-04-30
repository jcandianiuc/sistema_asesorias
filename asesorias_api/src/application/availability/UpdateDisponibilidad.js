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

class UpdateDisponibilidades {

    /**
     * @param {AvailabilityRepository} repository
     */
    constructor(repository) {
      this.repository = repository;
    }
  
    process(data) {
      assertThatIdIsValid(data.id);
      const entity = new Disponibilidad
      entity.id = data.id;
      entity.idUsuario = data.idUsuario;
      entity.addType(data.tipoDisponibilidad);
      entity.addLifespan(data.fecha, data.timeInit, data.timeFin);
      entity.addAuditData(data.createdAt, data.createdBy);

      return this.repository.create(entity);
    }
  }
  
  module.exports = UpdateDisponibilidades;