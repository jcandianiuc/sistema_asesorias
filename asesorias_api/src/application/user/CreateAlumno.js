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
    const { data, abstract } = command;
    const entity = new Alumno;
    const user = new User;

    entity.addMatricula(data.matricula);
    entity.addAuditData(data.createdAt, data.createdBy);

    user.addName(abstract.nombre, abstract.paterno, abstract.materno);
    user.addBasics(abstract.email, abstract.birthday, abstract.telefono, abstract.sexo);
    user.addAuditData(abstract.createdAt, abstract.createdBy);

    this.service({user, role:'Alumno'});
    entity.usuario = user;

    return this.repository.create(entity);
  }
}

module.exports = CreateAlumno;