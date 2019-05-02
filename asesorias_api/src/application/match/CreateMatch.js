const {basePath} = global;
const { Match } = require(`${basePath}/src/domain/models`);

class CreateDisponibilidad {

  /**
   * @param {MatchRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(data) {
    const entity = new Match
    entity.addLink(data.idAlumno, data.idDocente, data.idAula);
    entity.addDate(data.fecha, data.horas, data.extras);
    entity.addAuditData(data.createdAt, data.createdBy);

    return this.repository.create(entity);
  }
}

module.exports = CreateDisponibilidad;