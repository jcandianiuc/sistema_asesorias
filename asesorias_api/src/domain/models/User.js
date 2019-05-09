const { basePath } = global;
const { polyfill } = require(`${basePath}/helpers`);
const AuthAssignment = require('./AuthAssignment');

class User {
  constructor(data = {}) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.paterno = data.paterno;
    this.materno = data.materno;
    this.email = data.email;
    this.password = data.password;
    this.birthday = data.birthday;
    this.telefono = data.telefono;
    this.sexo = data.sexo;
    this.engine = data.engine;
    this.roles = data.roles;
  }

  setPassword(password) {
    this.password = password;
  }

  addName(nombre, paterno, materno) {
    this.nombre = nombre;
    this.paterno = paterno;
    this.materno = materno;
  }

  addBasics(email, birthday, telefono, sexo) {
    this.email = email;
    this.birthday = birthday;
    this.telefono = telefono;
    this.sexo = sexo;
  }

  addAuditData(createdAt, createdBy) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }

  addRole(role) {
    if (!(this.roles instanceof Array)) {
      this.roles = [];
    }
    const authAssignment = new AuthAssignment();
    authAssignment.addRole(role);
    this.roles.push(authAssignment);
  }

  validatePassword(password) {
    return (!polyfill.empty(password) && (password === this.password) );
  }
}

module.exports = User;
