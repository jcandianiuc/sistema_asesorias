class Disponibilidad {
  constructor(data = {}) {
    this.id = data.id;
    this.idUsuario = data.idUsuario;
    this.fecha = data.fecha;
    this.status = data.status;
    this.tipoDisponibilidad = data.tipoDisponibilidad;
    this.timeInit = data.timeInit;
    this.timeFin = data.timeFin;
    this.createdAt = data.createdAt;
    this.createdBy = data.createdBy;
  }

  addType(type) {
    this.tipoDisponibilidad = type;
  }

  addLifespan(fecha, timeInit, timeFin) {
    this.fecha = fecha;
    this.timeInit = timeInit;
    this.timeFin = timeFin;
  }

  addAuditData(createdAt, createdBy) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

module.exports = Disponibilidad;