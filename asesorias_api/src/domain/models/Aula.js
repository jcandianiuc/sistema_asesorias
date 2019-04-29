class Aula {
  constructor(data = {}) {
    this.id = data.id;
    this.edificio = data.edificio;
    this.noAsignacion = data.noAsignacion;
    this.nota = data.nota;
  }
}

module.exports = Aula;