class FetchDocentes {

  /**
   * @param {DocenteRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(command) {
    return this.repository.get(command);
  }
}

module.exports = FetchDocentes;