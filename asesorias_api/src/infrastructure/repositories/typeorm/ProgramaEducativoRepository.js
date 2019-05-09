const Joi = require('joi');

const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);
const { ProgramaEducativo } = require(`${basePath}/src/domain/models`);

/**
 * Valida que exista la id de la programaEducativo, de esta forma se sabe que
 * esta guardada de base de datos
 * @param {ProgramaEducativo} programaEducativo
 */
function assertThatProgramaEducativoIsUpdatable(programaEducativo) {
  if (polyfill.empty(programaEducativo.id)) {
    const err = new Error('No se puede actualizar la programaEducativo');
    err.code = 500;
    throw err;
  }
}

/**
 * Valida que la programaEducativo exista
 * @param {ProgramaEducativo} programaEducativo
 */
function assertThatProgramaEducativoIsNotEmpty(programaEducativo) {
  if (polyfill.empty(programaEducativo)) {
    const err = new Error('No se encontró la programaEducativo');
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
 * Valida que el objeto recibido sea una instancia de ProgramaEducativo.
 * @param {ProgramaEducativo} programaEducativo
 */
function assertThatIsProgramaEducativo(programaEducativo) {
  if (!(programaEducativo instanceof ProgramaEducativo)) {
    throw new TypeError('No se recibio un modelo de programaEducativo');
  }
}

class ProgramaEducativoRepository {
  constructor(connection) {
    if (polyfill.isset(connection)) {
      this.repository = connection.getRepository(ProgramaEducativo);
    }
  }

  /**
   * Método encargado de guardar una programaEducativo.
   * @param {ProgramaEducativo} programaEducativo
   */
  create(programaEducativo) {
    assertThatIsProgramaEducativo(programaEducativo);
    return this.persist(programaEducativo);;
  }

  /**
   * Método encargado de de encontrar programaEducativos dados ciertos filtros.
   * @param {Object} filters
   */
  get(filters) {
    const [skip, take] = filters.limit;
    return this.find({ ...filters }, { skip, take });
  }

  /**
   * Método encargado de encontrar una ProgramaEducativo por su id
   * @param {string} id
   */
  async byUuidOrFail(id) {
    assertThatIdIsValid(id);
    const res = await this.find({ id });
    assertThatProgramaEducativoIsNotEmpty(res[0]);

    return res[0];
  }

  /**
   * Método encargado de actualizar una programaEducativo
   * @param {ProgramaEducativo} programaEducativo
   */
  async update(programaEducativo) {
    assertThatProgramaEducativoIsUpdatable(programaEducativo);
    return this.persist(programaEducativo);
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
   * Método encargado de persistir la programaEducativo en la base de datos.
   * @param {ProgramaEducativo} item
   */
  persist(item) {
    return this.repository.save(item);
  }

  /**
   * Método encargado de buscar programaEducativos en la base de datos.
   * @param {Object} params
   */
  find(params = {}, limit = {}) {
    return this.repository.find({ where: { ...params }, ...limit });
  }
}

module.exports = ProgramaEducativoRepository;
