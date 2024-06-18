import { EntitySchema } from 'typeorm';

const EmailAuthenticationSchema = new EntitySchema({
  name: 'EmailAuthentication',
  tableName: 'EmailAuthentication',
  schema: 'dbo',
  columns: {
    Id_Auth: {
      type: 'int',
      primary: true,
      generated: true,
      name: 'Id_Auth',
    },
    Mail_Client: {
      type: 'nvarchar',
      name: 'Mail_Client',
    },
    Date_Auth: {
      type: 'datetime',
      name: 'Date_Auth',
    },
    Code_Client: {
      type: 'int',
      name: 'Code_Client',
    },
  },
  indices: [
    {
      name: 'PK__EmailAut__B4BE8EA25E833207',
      unique: true,
      columns: ['Id_Auth'],
    },
  ],
});

export default EmailAuthenticationSchema;
