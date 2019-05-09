class FetchPrograms {

  /**
   * @param {ProgramaEducativoRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(command) {
    return this.repository.find(command);
  }
}

module.exports = FetchPrograms;