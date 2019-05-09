const {basePath} = global;
const { Docente, User } = require(`${basePath}/src/domain/models`);

class CreateDocente {

  /**
   * @param {DocenteRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(command) {
    const { abstract } = command;
    const entity = new Docente;
    const user = new User;

    entity.addAuditData(command.createdAt, command.createdBy);

    user.addName(abstract.nombre, abstract.paterno, abstract.materno);
    user.addBasics(abstract.email, abstract.birthday, abstract.telefono, abstract.sexo);
    user.addAuditData(abstract.createdAt, abstract.createdBy);
    user.setPassword(abstract.password);

    user.addRole('Docente');
    entity.abstract = user;
    
    return this.repository.create(entity);
  }
}

module.exports = CreateDocente;