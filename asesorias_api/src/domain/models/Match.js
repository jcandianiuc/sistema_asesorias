class Match {
  constructor(data = {}) {
    this.id = data.id;
    this.idAlumno = data.idAlumno;
    this.idDocente = data.idDocente;
    this.idAula = data.idAula;
    this.horas = data.horas;
    this.fecha = data.fecha;
    this.extras = data.extras;
    // this.createdAt = data.createdAt;
    // this.createdBy = data.createdBy;
  }

  addLink(idAlumno, idDocente, idAula) {
    this.idAlumno = idAlumno;
    this.idDocente = idDocente;
    this.idAula = idAula;
  }

  addDate(fecha, horas, extras) {
    this.fecha = fecha;
    this.horas = horas;
    this.extras = extras;
  }

  addAuditData(createdAt, createdBy) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

module.exports = Match;