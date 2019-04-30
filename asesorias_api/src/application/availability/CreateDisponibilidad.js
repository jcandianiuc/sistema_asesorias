const {basePath} = global;
const { Disponibilidad } = require(`${basePath}/src/domain/models`);

class CreateDisponibilidad {

  /**
   * @param {AvailabilityRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(data) {
    const entity = new Disponibilidad
    entity.idUsuario = data.idUsuario;
    entity.addType(data.tipoDisponibilidad);
    entity.addLifespan(data.fecha, data.timeInit, data.timeFin);
    entity.addAuditData(data.createdAt, data.createdBy);

    return this.repository.create(entity);
  }
}

module.exports = CreateDisponibilidad;