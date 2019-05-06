class Aula {
  constructor(data = {}) {
    this.id = data.id;
    this.edificio = data.edificio;
    this.planta = data.planta;
    this.noAsignacion = data.noAsignacion;
    this.nota = data.nota;
  }
}

module.exports = Aula;