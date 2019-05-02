class FetchDocentes {

  /**
   * @param {DocenteRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(command) {
    return this.repository.find(command);
  }
}

module.exports = FetchDocentes;