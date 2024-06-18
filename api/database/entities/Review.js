import { EntitySchema } from 'typeorm';

const ReviewSchema = new EntitySchema({
  name: 'Review',
  tableName: 'Review',
  schema: 'dbo',
  columns: {
    Id_Review: {
      type: 'int',
      generated: 'increment',
      primary: true,
      name: 'Id_Review',
    },
    Id_Client: { // Внешний ключ для связи с сущностью Client
        type: 'int',
        name: 'Id_Client',
      },
    Review: {
      type: 'nvarchar',
      name: 'Review',
    },
  },
  indices: [
    {
      name: 'PK__Review__7C0798D82735342E',
      unique: true,
      columns: ['Id_Review'],
    },
  ],
  foreignKeys: [ // Определение внешнего ключа
    {
      name: 'FK_Review_Client', // Имя внешнего ключа
      columnNames: ['Id_Client'], // Колонка в текущей таблице
      referencedTableName: 'Client', // Таблица, на которую ссылается внешний ключ
      referencedColumnNames: ['Id_client'], // Колонка в целевой таблице
    },
  ],
  relations: {
    Client: {
      target: 'Client',
      type: 'many-to-one',
      joinColumn: {
        name: 'Id_Client',
        referencedColumnName: 'Id_client',
      },
    },
  },
});

export default ReviewSchema;
