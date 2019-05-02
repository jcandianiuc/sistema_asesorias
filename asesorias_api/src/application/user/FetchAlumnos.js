class FetchAlumnos {

    /**
     * @param {AlumnoRepository} repository
     */
    constructor(repository) {
      this.repository = repository;
    }
  
    process(command) {
      return this.repository.find(command);
    }
  }
  
  module.exports = FetchAlumnos;