const {basePath} = global;
const { Alumno } = require(`${basePath}/src/domain/models`);

class CreateAlumno {

  /**
   * @param {AlumnoRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(data) {
    const entity = new Alumno
    entity.addLink(data.idAlumno, data.idDocente, data.idAula);
    entity.addDate(data.fecha, data.horas, data.extras);
    entity.addAuditData(data.createdAt, data.createdBy);

    return this.repository.create(entity);
  }
}

module.exports = CreateAlumno;