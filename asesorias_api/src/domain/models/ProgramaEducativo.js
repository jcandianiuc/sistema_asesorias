class ProgramaEducativo {
  constructor(data = {}) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.gradoAcademico = data.gradoAcademico;
    this.duracion = data.duracion;
    this.tipoCertificado = data.tipoCertificado;
    this.perfilIngreso = data.perfilIngreso;
    this.perfilEgreso = data.perfilEgreso;
  }

  addPerfil(perfilIngreso, perfilEgreso) {
    this.perfilIngreso = perfilIngreso;
    this.perfilEgreso = perfilEgreso;
  }

  addBody(gradoAcademico, duracion, tipoCertificado) {
    this.gradoAcademico = gradoAcademico;
    this.duracion = duracion;
    this.tipoCertificado = tipoCertificado;
  }

  addName(nombre) {
    this.nombre = nombre;
  }
}

module.exports = ProgramaEducativo;