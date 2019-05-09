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
    const err = new Error('No se puede actualizar el alumno');
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
    const err = new Error('No se encontró el alumno');
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
    return this.persist(alumno);
  }

  /**
   * Método encargado de de encontrar alumnos dados ciertos filtros.
   * @param {Object} filters
   */
  get(filters) {
    const [skip, take] = filters.limit;

    const mySearchPromise = this.find({ ...filters }, { skip, take }, ['abstract']);

    return new Promise(async (resolve, reject) => {
      if (!(mySearchPromise instanceof Promise)) {
        reject(new Error('No se pudo realizar la petición'));
      }

      const [items, total] = await mySearchPromise;

      resolve({
        items,
        total,
      });
    });
  }

  /**
   * Método encargado de encontrar una Alumno por su id
   * @param {string|number} id
   */
  async byUuidOrFail(id) {
    assertThatIdIsValid(id);
    const item = (await this.find({ id }, null, ['abstract', 'abstract.roles']))[0];
    assertThatAlumnoIsNotEmpty(item);

    return item;
  }

  /**
   * Método encargado de actualizar un alumno
   * @param {Alumno} alumno
   */
  async update(alumno) {
    assertThatAlumnoIsUpdatable(alumno);
    return this.persist(alumno);
  }

  /**
   * Método encargado de persistir el alumno en la base de datos.
   * @param {Alumno} item
   */
  persist(item) {
    return this.repository.save(item);
  }

  /**
   * Método encargado de buscar alumnos en la base de datos.
   * @param {Object} params
   */
  find(params = {}, limit = {}, relations = []) {
    return this.repository.findAndCount({ where: { ...params }, ...limit, relations });
  }
}

module.exports = AlumnoRepository;
