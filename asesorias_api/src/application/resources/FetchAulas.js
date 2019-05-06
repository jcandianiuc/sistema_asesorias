class FetchAulas {

  /**
   * @param {AulaRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(filters) {
    return this.repository.find(filters);
  }
}

module.exports = FetchAulas;