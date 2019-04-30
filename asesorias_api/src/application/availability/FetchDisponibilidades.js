class FetchDisponibilidades {

  /**
   * @param {AvailabilityRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(filters) {
    return this.repository.find(filters);
  }
}

module.exports = FetchDisponibilidades;