class FetchMatches {

  /**
   * @param {MatchRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  process(command) {
    return this.repository.find(command);
  }
}

module.exports = FetchMatches;