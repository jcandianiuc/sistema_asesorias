const {basePath} = global;
const { Match } = require(`${basePath}/src/domain/models`);

class CreateMatch {
  /**
   * @param {MatchRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(command) {
    const entity = new Match
    entity.addLink(command.idAlumno, command.idDocente, command.idAula);
    entity.addDate(command.fecha, command.horas, command.extras);
    // entity.addAuditData(command.createdAt, command.createdBy);

    return this.repository.create(entity);
  }
}

module.exports = CreateMatch;