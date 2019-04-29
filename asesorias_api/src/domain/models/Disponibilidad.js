class Disponibilidad {
  constructor(data = {}) {
    this.id = data.id;
    this.fecha = data.fecha;
    this.tipoDisponibilidad = data.tipoDisponibilidad;
    this.timeInit = data.timeInit;
    this.timeFin = data.timeFin;
  }
}

module.exports = Disponibilidad;