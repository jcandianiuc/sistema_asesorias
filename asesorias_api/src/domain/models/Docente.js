
class Docente {
  constructor(data = {}) {
    this.id = data.id;
    this.idUsuario = data.idUsuario;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.usuario = data.usuario;
  }

  addAuditData(createdAt, createdBy) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }

}

module.exports = Docente;
