const Joi = require('joi');

const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);
const { Alumno } = require(`${basePath}/src/domain/models`);

/**
 * Valida que exista la id de la alumno, de esta forma se sabe que
 * esta guardada de base de datos
 * @param {Alumno} alumno
 */
function assertThatAlumnoIsUpdatable(alumno) {
  if (polyfill.empty(alumno.id)) {
    const err = new Error('No se puede actualizar la alumno');
    err.code = 500;
    throw err;
  }
}

/**
 * Valida que la alumno exista
 * @param {Alumno} alumno
 */
function assertThatAlumnoIsNotEmpty(alumno) {
  if (polyfill.empty(alumno)) {
    const err = new Error('No se encontró la alumno');
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
 * Valida que el objeto recibido sea una instancia de Alumno.
 * @param {Alumno} alumno
 */
function assertThatIsAlumno(alumno) {
  if (!(alumno instanceof Alumno)) {
    throw new TypeError('No se recibio un modelo de alumno');
  }
}

class AlumnoRepository {
  constructor(connection) {
    if (polyfill.isset(connection)) {
      this.repository = connection.getRepository(Alumno);
    }
  }

  /**
   * Método encargado de guardar una alumno.
   * @param {Alumno} alumno
   */
  create(alumno) {
    assertThatIsAlumno(alumno);
    return this.persist(alumno);;
  }

  /**
   * Método encargado de de encontrar alumnos dados ciertos filtros.
   * @param {Object} filters
   */
  get(filters) {
    const [skip, take] = filters.limit;
    return this.find({ ...filters }, { skip, take });
  }

  /**
   * Método encargado de encontrar una Alumno por su id
   * @param {string} id
   */
  async byUuidOrFail(id) {
    assertThatIdIsValid(id);
    const res = await this.find({ id });
    assertThatAlumnoIsNotEmpty(res[0]);

    return res[0];
  }

  /**
   * Método encargado de actualizar una alumno
   * @param {Alumno} alumno
   */
  async update(alumno) {
    assertThatAlumnoIsUpdatable(alumno);
    return this.persist(alumno);
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
   * Método encargado de persistir la alumno en la base de datos.
   * @param {Alumno} item
   */
  persist(item) {
    return this.repository.save(item);
  }

  /**
   * Método encargado de buscar alumnos en la base de datos.
   * @param {Object} params
   */
  find(params = {}, limit = {}) {
    return this.repository.find({ where: { ...params }, ...limit });
  }
}

module.exports = AlumnoRepository;
