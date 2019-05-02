const {basePath} = global;
const { Docente, User } = require(`${basePath}/src/domain/models`);

class CreateDocente {

  /**
   * @param {DocenteRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(data) {
    const entity = new Docente;
    const abstract = new User;

    
    entity.idUsuario = data.idUsuario;
    entity.addType(data.tipoDocente);
    entity.addLifespan(data.fecha, data.timeInit, data.timeFin);
    entity.addAuditData(data.createdAt, data.createdBy);

    return this.repository.create(entity);
  }
}

module.exports = CreateDocente;