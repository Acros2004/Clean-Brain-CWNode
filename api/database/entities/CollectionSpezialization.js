import { EntitySchema } from 'typeorm';

const CollectionSpezializationSchema = new EntitySchema({
  name: 'CollectionSpezialization',
  tableName: 'CollectionSpezialization',
  columns: {
    Id_Psychologist: {
      type: 'int',
      name: 'Id_Psychologist',
      primary: true,
    },
    Spezialization_Name: {
      type: 'nvarchar',
      length: 60,
      name: 'Spezialization_Name',
      primary: true,
    },
  },
  foreignKeys: [
    {
      name: 'FK_Psychologist',
      columnNames: ['Id_Psychologist'],
      referencedTableName: 'Psychologist',
      referencedColumnNames: ['Id_Psychologist'],
    },
    {
      name: 'FK_Spezialization',
      columnNames: ['Spezialization_Name'],
      referencedTableName: 'Specialization',
      referencedColumnNames: ['Spezialization_Name'],
    },
  ],
  indices: [
    {
      name: 'PK_CollectionSpezialization',
      unique: true,
      columns: ['Id_Psychologist', 'Spezialization_Name'],
    },
  ],
  relations: {
    Psychologist: {
      target: 'Psychologist',
      type: 'many-to-one',
      joinColumn: {
        name: 'Id_Psychologist',
        referencedColumnName: 'Id_Psychologist',
      },
    },
    Spezializations: {
      target: 'Specialization',
      type: 'many-to-one',
      joinColumn: {
        name: 'Spezialization_Name',
        referencedColumnName: 'Spezialization_Name',
      },
    },
  },
  
});

export default CollectionSpezializationSchema;
