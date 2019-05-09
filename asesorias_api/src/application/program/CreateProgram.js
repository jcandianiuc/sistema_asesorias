const { basePath } = global;
const { ProgramaEducativo } = require(`${basePath}/src/domain/models`);

class CreateProgram {
  /**
   * @param {ProgramaEducativoRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(command) {
    const entity = new ProgramaEducativo
    entity.addPerfil(command.perfilIngreso, command.perfilEgreso);
    entity.addBody(command.gradoAcademico, command.duracion, command.tipoCertificado);
    entity.addName(command.nombre);

    return this.repository.create(entity);
  }
}

module.exports = CreateProgram;