const { basePath } = global;

const { EntitySchema } = require('typeorm');
const { ProgramaEducativo: ProgramaEducativoModel } = require(`${basePath}/src/domain/models`);

const ProgramaEducativo = new EntitySchema({
  name: 'ProgramaEducativo',
  tableName: 'programa_educativo',
  target: ProgramaEducativoModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      nullable: false,
    },
    nombre: {
      type: String,
      nullable: true,
    },
    gradoAcademico: {
      type: String,
      nullable: true,
      name: 'grado_academico'
    },
    duracion: {
      type: String,
      nullable: true,
    },
    tipoCertificado: {
      type: String,
      nullable: true,
      name: 'tipo_certificado'
    },
    perfilIngreso: {
      type: String,
      nullable: true,
      name: 'perfil_ingreso'
    },
    perfilEgreso: {
      type: String,
      nullable: true,
      name: 'perfil_egreso'
    },
  }
});

module.exports = ProgramaEducativo;