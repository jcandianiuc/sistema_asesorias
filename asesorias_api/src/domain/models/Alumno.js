
class Alumno {
  constructor(data = {}) {
    this.id = data.id;
    this.idUsuario = data.idUsuario;
    this.matricula = data.matricula;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.usuario = data.usuario;
  }

  addAuditData(createdAt, createdBy) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

module.exports = Alumno;
