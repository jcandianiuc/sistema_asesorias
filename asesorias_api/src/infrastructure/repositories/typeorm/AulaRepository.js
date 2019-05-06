const Joi = require('joi');

const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);
const { Aula } = require(`${basePath}/src/domain/models`);

class AulaRepository {
  constructor(connection) {
    if (polyfill.isset(connection)) {
      this.repository = connection.getRepository(Aula);
    }
  }

  /**
   * Método encargado de de encontrar aulas dados ciertos filtros.
   * @param {Object} filters
   */
  get(filters) {
    const [skip, take] = filters.limit;
    return this.find({ ...filters }, { skip, take });
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
   * Método encargado de buscar aula en la base de datos.
   * @param {Object} params
   */
  find(params = {}, limit = {}) {
    return this.repository.find({ where: { ...params }, ...limit });
  }
}

module.exports = AulaRepository;
