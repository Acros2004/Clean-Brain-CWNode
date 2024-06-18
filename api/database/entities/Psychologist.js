import { EntitySchema } from 'typeorm';

const PsychologistSchema = new EntitySchema({
  name: 'Psychologist',
  tableName: 'Psychologist',
  schema: 'dbo',
  columns: {
    Id_Psychologist: {
      type: 'int',
      primary: true,
      generated: true,
      name: 'Id_Psychologist',
    },
    Name_Psychologist: {
      type: 'nvarchar',
      name: 'Name_Psychologist',
    },
    Surname_Psychologist: {
      type: 'nvarchar',
      name: 'Surname_Psychologist',
    },
    Patronymic_Psychologist: {
      type: 'nvarchar',
      name: 'Patronymic_Psychologist',
    },
    Mail_Psychologist: {
      type: 'nvarchar',
      name: 'Mail_Psychologist',
    },
    Experience: {
      type: 'smallint',
      name: 'Experience',
    },
    Photo_Psychologist: {
      type: 'nvarchar',
      name: 'Photo_Psychologist',
      nullable: true,
    },
    Description: {
      type: 'nvarchar',
      name: 'Description',
      nullable: true,
    },
    Degree: {
        type: 'nvarchar', // Тип колонки для хранения внешнего ключа
        name: 'Degree', // Имя колонки с внешним ключом
      },
  },
  foreignKeys: [
    {
      name: 'FK_Psychologist_Academic', // Имя внешнего ключа
      columnNames: ['Degree'], // Колонка в текущей таблице
      referencedTableName: 'Academic_Degree', // Таблица, на которую ссылается внешний ключ
      referencedColumnNames: ['Academic_Name'], // Колонка в целевой таблице
    },
  ],
  relations: {
    CollectionSpezialization: {
      target: 'CollectionSpezialization',
      type: 'one-to-many',
      inverseSide: 'Psychologist',
    },
    Academic_Degree: {
      target: 'Academic_Degree',
      type: 'many-to-one',
      joinColumn: {
        name: 'Degree',
        referencedColumnName: 'Academic_Name',
      },
    },
    Timetable: {
      target: 'Timetable',
      type: 'one-to-one',
      inverseSide: 'Psychologist',
    },
    Voucher: {
      target: 'Voucher',
      type: 'one-to-many',
      inverseSide: 'Psychologist',
    },
  },
  
  indices: [
    {
      name: 'PK__Psycholo__282F0EC14C66DB60',
      unique: true,
      columns: ['Id_Psychologist'],
    },
  ],
});

export default PsychologistSchema;
