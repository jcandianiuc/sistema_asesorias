const Joi = require('joi');

const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);
const { User } = require(`${basePath}/src/domain/models`);

/**
 * Valida que exista la id de la user, de esta forma se sabe que
 * esta guardada de base de datos
 * @param {User} user
 */
function assertThatUserIsUpdatable(user) {
  if (polyfill.empty(user.id)) {
    const err = new Error('No se puede actualizar la user');
    err.code = 500;
    throw err;
  }
}

/**
 * Valida que la user exista
 * @param {User} user
 */
function assertThatUserIsNotEmpty(user) {
  if (polyfill.empty(user)) {
    const err = new Error('No se encontró el user');
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
 * Valida que el objeto recibido sea una instancia de User.
 * @param {User} user
 */
function assertThatIsUser(user) {
  if (!(user instanceof User)) {
    throw new TypeError('No se recibio un modelo de user');
  }
}

class UserRepository {
  constructor(connection) {
    if (polyfill.isset(connection)) {
      this.repository = connection.getRepository(User);
    }
  }

  /**
   * Método encargado de guardar una user.
   * @param {User} user
   */
  create(user) {
    assertThatIsUser(user);
    return this.persist(user);;
  }

  /**
   * Método encargado de de encontrar users dados ciertos filtros.
   * @param {Object} filters
   */
  get(filters) {
    const [skip, take] = filters.limit;
    return this.find({ ...filters }, { skip, take });
  }

  /**
   * Método encargado de encontrar una User por su id
   * @param {string} email
   */
  async byEmailOrFail(email) {
    // assertThatEmailIsValid(id);
    const usr = (await this.find({ email }, null, ['roles']))[0];
    assertThatUserIsNotEmpty(usr);

    return usr;
  }

  /**
   * Método encargado de actualizar una user
   * @param {User} user
   */
  async update(user) {
    assertThatUserIsUpdatable(user);
    return this.persist(user);
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
   * Método encargado de persistir la user en la base de datos.
   * @param {User} item
   */
  persist(item) {
    return this.repository.save(item);
  }

  /**
   * Método encargado de buscar users en la base de datos.
   * @param {Object} params
   */
  find(params = {}, limit = {}, relations = []) {
    return this.repository.find({ where: { ...params }, ...limit, relations });
  }
}

module.exports = UserRepository;
