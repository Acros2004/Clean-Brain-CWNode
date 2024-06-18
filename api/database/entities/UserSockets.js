import { EntitySchema } from 'typeorm';

const UserSocketsSchema = new EntitySchema({
  name: 'UserSockets',
  tableName: 'UserSockets',
  schema: 'dbo',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
      name: 'id',
    },
    userId: {
      type: 'int',
      name: 'userId',
    },
    socketId: {
      type: 'nvarchar',
      length: 255,
      name: 'socketId',
    },
  },
  indices: [
    {
      name: 'PK__UserSock__3214EC0734A45E69',
      unique: true,
      columns: ['id'],
    },
  ],
});

export default UserSocketsSchema;
