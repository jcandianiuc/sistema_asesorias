
class User {
  constructor(data = {}) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.paterno = data.paterno;
    this.materno = data.materno;
    this.email = data.email;
    this.birthday = data.birthday;
    this.telefono = data.telefono;
    this.sexo = data.sexo;
    this.engine = data.engine;
    this.role = data.role;
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
}

module.exports = User;
