import { EntitySchema } from 'typeorm';

const RefreshSessionsSchema = new EntitySchema({
  name: 'RefreshSessions',
  tableName: 'RefreshSessions',
  schema: 'dbo',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
      name: 'id',
    },
    refresh_token: {
      type: 'varchar',
      length: 400,
      name: 'refresh_token',
    },
    finger_print: {
      type: 'varchar',
      length: 32,
      name: 'finger_print',
    },
    client_id: {
        type: 'int',
        name: 'client_id',
    },
  },
  foreignKeys: [
    {
      name: 'FK_RefreshSessions_Client',
      columnNames: ['client_id'],
      referencedTableName: 'Client',
      referencedColumnNames: ['Id_client'],
      onDelete: 'CASCADE',
    },
  ],
  relations: {
    Client: {
      target: 'Client',
      type: 'many-to-one',
      onDelete: 'CASCADE',
      joinColumn: {
        name: 'client_id',
        referencedColumnName: 'Id_client',
      },
    },
  },
  indices: [
    {
      name: 'PK__RefreshS__3213E83F5C04A1BC',
      unique: true,
      columns: ['id'],
    },
  ],
});

export default RefreshSessionsSchema;
