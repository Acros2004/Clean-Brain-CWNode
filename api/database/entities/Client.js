import { EntitySchema } from 'typeorm';

const ClientSchema = new EntitySchema({
  name: 'Client',
  tableName: 'Client',
  schema: 'dbo',
  columns: {
    Id_client: {
      type: 'int',
      generated: 'increment',
      primary: true,
      name: 'Id_client',
    },
    Name_Client: {
      type: 'nvarchar',
      name: 'Name_Client',
    },
    Surname_Client: {
      type: 'nvarchar',
      name: 'Surname_Client',
    },
    Login_Client: {
      type: 'nvarchar',
      name: 'Login_Client',
    },
    Password_Client: {
      type: 'nvarchar',
      name: 'Password_Client',
    },
    Photo_Client: {
      type: 'nvarchar',
      nullable: true,
      name: 'Photo_Client',
    },
    Mail_Client: {
      type: 'nvarchar',
      name: 'Mail_Client',
    },
    Role_Client: {
      type: 'nvarchar',
      name: 'Role_Client',
    },
  },
  indices: [
    {
      name: 'PK__Client__8829B11E61A803E4',
      unique: true,
      columns: ['Id_client'],
    },
  ],
  relations: {
    Booking: {
      target: 'Booking',
      type: 'one-to-many',
      inverseSide: 'Client',
    },
    RefreshSessions: {
      target: 'RefreshSessions',
      type: 'one-to-many',
      inverseSide: 'Client',
    },
    Review: {
      target: 'Review',
      type: 'one-to-many',
      inverseSide: 'Client',
    },
  },
});

export default ClientSchema;
