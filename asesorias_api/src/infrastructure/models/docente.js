import { EntitySchema } from 'typeorm';
import { User } from './user.entity';

export const Docente = new EntitySchema({
  name: 'Docente',
  tableName: 'docente',

  columns: {
    id: {
      type: "integer",
      primary: true,
      generated: true,
    },

    idUsuario: {
        type: "integer",
        name: "id_usuario",
    },

    createdAt: {
      name: 'created_at',
      type: 'timestamp with time zone',
      createDate: true,
    },

    createdBy: {
      name: 'created_by',
      type: 'timestamp with time zone',
      updateDate: true,
    }
  }
});