const {basePath} = global;
const { Alumno, User } = require(`${basePath}/src/domain/models`);

class CreateAlumno {

  /**
   * @param {AlumnoRepository} repository
   */
  constructor(repository, service) {
    this.repository = repository;
    this.service = service;
  }

  process(command) {
    const { abstract } = command;
    const entity = new Alumno;
    const user = new User;

    entity.addMatricula(command.matricula);
    entity.addAuditData(command.createdAt, command.createdBy);

    user.addName(abstract.nombre, abstract.paterno, abstract.materno);
    user.addBasics(abstract.email, abstract.birthday, abstract.telefono, abstract.sexo);
    user.addAuditData(abstract.createdAt, abstract.createdBy);
    user.setPassword(abstract.password);
    user.addAuditData(command.createdAt, command.createdBy);

    this.service.process({user, role:'Alumno'});
    entity.abstract = user;

    return this.repository.create(entity);
  }
}

module.exports = CreateAlumno;