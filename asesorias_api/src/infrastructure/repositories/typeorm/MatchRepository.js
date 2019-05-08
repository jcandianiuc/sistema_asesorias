const Joi = require('joi');

const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);
const { Match } = require(`${basePath}/src/domain/models`);

/**
 * Valida que exista la id de la match, de esta forma se sabe que
 * esta guardada de base de datos
 * @param {Match} match
 */
function assertThatMatchIsUpdatable(match) {
  if (polyfill.empty(match.id)) {
    const err = new Error('No se puede actualizar la match');
    err.code = 500;
    throw err;
  }
}

/**
 * Valida que la match exista
 * @param {Match} match
 */
function assertThatMatchIsNotEmpty(match) {
  if (polyfill.empty(match)) {
    const err = new Error('No se encontró la match');
    err.code = 404;
    throw err;
  }
}

/**
 * Valida que la id recibida tenga un formato correcto
 * @param {string} id
 */
function assertThatIdIsValid(id) {
  const joiError = Joi.number().min(1).validate(id).error;

  if (polyfill.isset(joiError)) {
    joiError.code = 400;
    throw joiError;
  }
}

/**
 * Valida que el objeto recibido sea una instancia de Match.
 * @param {Match} match
 */
function assertThatIsMatch(match) {
  if (!(match instanceof Match)) {
    throw new TypeError('No se recibio un modelo de match');
  }
}

class MatchRepository {
  constructor(connection) {
    if (polyfill.isset(connection)) {
      this.repository = connection.getRepository(Match);
    }
  }

  /**
   * Método encargado de guardar una match.
   * @param {Match} match
   */
  create(match) {
    assertThatIsMatch(match);
    return this.persist(match);;
  }

  /**
   * Método encargado de de encontrar matchs dados ciertos filtros.
   * @param {Object} filters
   */
  get(filters) {
    const [skip, take] = filters.limit;
    return this.find({ ...filters }, { skip, take });
  }

  /**
   * Método encargado de encontrar una Match por su id
   * @param {string} id
   */
  async byUuidOrFail(id) {
    assertThatIdIsValid(id);
    const res = await this.find({ id });
    assertThatMatchIsNotEmpty(res[0]);

    return res[0];
  }

  /**
   * Método encargado de actualizar una match
   * @param {Match} match
   */
  async update(match) {
    assertThatMatchIsUpdatable(match);
    return this.persist(match);
  }

  /**
   * Método encargado de obtener el conteo de objetos.
   * @param {Object} filters
   */
  async count(filters = {}) {
    const [skip, take] = filters.limit;
    const count = await this.repository.count({ where: { ...filters }, skip, take });
    return count;
  }

  /**
   * Método encargado de persistir la match en la base de datos.
   * @param {Match} item
   */
  persist(item) {
    return this.repository.save(item);
  }

  /**
   * Método encargado de buscar matchs en la base de datos.
   * @param {Object} params
   */
  find(params = {}, limit = {}) {
    return this.repository.find({ where: { ...params }, ...limit });
  }
}

module.exports = MatchRepository;
