const Joi = require('joi');

const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);
const { Docente } = require(`${basePath}/src/domain/models`);

/**
 * Valida que exista la id de la docente, de esta forma se sabe que
 * esta guardada de base de datos
 * @param {Docente} docente
 */
function assertThatDocenteIsUpdatable(docente) {
  if (polyfill.empty(docente.id)) {
    const err = new Error('No se puede actualizar la docente');
    err.code = 500;
    throw err;
  }
}

/**
 * Valida que la docente exista
 * @param {Docente} docente
 */
function assertThatDocenteIsNotEmpty(docente) {
  if (polyfill.empty(docente)) {
    const err = new Error('No se encontró el docente');
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
 * Valida que el objeto recibido sea una instancia de Docente.
 * @param {Docente} docente
 */
function assertThatIsDocente(docente) {
  if (!(docente instanceof Docente)) {
    throw new TypeError('No se recibio un modelo de docente');
  }
}

class DocenteRepository {
  constructor(connection) {
    if (polyfill.isset(connection)) {
      this.repository = connection.getRepository(Docente);
    }
  }

  /**
   * Método encargado de guardar una docente.
   * @param {Docente} docente
   */
  create(docente) {
    assertThatIsDocente(docente);
    return this.persist(docente);;
  }

  /**
   * Método encargado de de encontrar docentes dados ciertos filtros.
   * @param {Object} filters
   */
  get(filters) {
    const [skip, take] = filters.limit;
    const promise = this.find({ ...filters }, { skip, take }, ['abstract']);

    return new Promise(async (resolve, reject) => {
      if (!(promise instanceof Promise)) {
        reject(new Error('No se pudo realizar la petición'));
      }

      const [items, total] = await promise;

      resolve({
        items,
        total,
      });
    });
  }

  /**
   * Método encargado de encontrar una Docente por su id
   * @param {string} id
   */
  async byUuidOrFail(id) {
    assertThatIdIsValid(id);
    const item = (await this.find({ id }, null, ['abstract', 'abstract.roles']))[0];
    assertThatDocenteIsNotEmpty(item);

    return item;
  }

  /**
   * Método encargado de actualizar una docente
   * @param {Docente} docente
   */
  async update(docente) {
    assertThatDocenteIsUpdatable(docente);
    return this.persist(docente);
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
   * Método encargado de persistir la docente en la base de datos.
   * @param {Docente} item
   */
  persist(item) {
    return this.repository.save(item);
  }

  /**
   * Método encargado de buscar docentes en la base de datos.
   * @param {Object} params
   */
  find(params = {}, limit = {}, relations = []) {
    return this.repository.find({ where: { ...params }, ...limit, relations });
  }
}

module.exports = DocenteRepository;
