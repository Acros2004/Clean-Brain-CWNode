import { EntitySchema } from 'typeorm';

const TimetableSchema = new EntitySchema({
  name: 'Timetable',
  tableName: 'Timetable',
  schema: 'dbo',
  columns: {
    Id_Psychologist: {
      type: 'int',
      primary: true,
      name: 'Id_Psychologist',
    },
    MondStart: {
      type: 'datetime',
      nullable: true,
      name: 'MondStart',
    },
    MondEnd: {
      type: 'datetime',
      nullable: true,
      name: 'MondEnd',
    },
    TueStart: {
      type: 'datetime',
      nullable: true,
      name: 'TueStart',
    },
    TueEnd: {
      type: 'datetime',
      nullable: true,
      name: 'TueEnd',
    },
    WenStart: {
      type: 'datetime',
      nullable: true,
      name: 'WenStart',
    },
    WenEnd: {
      type: 'datetime',
      nullable: true,
      name: 'WenEnd',
    },
    ThuStart: {
      type: 'datetime',
      nullable: true,
      name: 'ThuStart',
    },
    ThuEnd: {
      type: 'datetime',
      nullable: true,
      name: 'ThuEnd',
    },
    FriStart: {
      type: 'datetime',
      nullable: true,
      name: 'FriStart',
    },
    FriEnd: {
      type: 'datetime',
      nullable: true,
      name: 'FriEnd',
    },
  },
  foreignKeys: [
    {
      name: 'FK_Timetable_Psychologist',
      columnNames: ['Id_Psychologist'],
      referencedTableName: 'Psychologist',
      referencedColumnNames: ['Id_Psychologist'],
    },
  ],
  relations: {
    Psychologist: {
      target: 'Psychologist',
      type: 'one-to-one',
      joinColumn: {
        name: 'Id_Psychologist',
        referencedColumnName: 'Id_Psychologist',
      },
    },
  },
  indices: [
    {
      name: 'PK__Timetabl__282F0EC15548FD13',
      unique: true,
      columns: ['Id_Psychologist'],
    },
  ],
});

export default TimetableSchema;
