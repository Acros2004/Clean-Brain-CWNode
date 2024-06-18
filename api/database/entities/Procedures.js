import { EntitySchema } from 'typeorm';

const ProceduresSchema = new EntitySchema({
  name: 'Procedures',
  tableName: 'Procedures',
  schema: 'dbo',
  columns: {
    Id_Procedure: {
      type: 'int',
      primary: true,
      generated: true,
      name: 'Id_Procedure',
    },
    Name_Procedure: {
      type: 'nvarchar',
      name: 'Name_Procedure',
    },
    Price: {
      type: 'float',
      name: 'Price',
      precision: 53,
    },
    Depiction: {
      type: 'nvarchar',
      name: 'Depiction',
    },
    Photo_Procedure: {
      type: 'nvarchar',
      name: 'Photo_Procedure',
      nullable: true,
    },
    Spezialization_Procedure: {
        type: 'nvarchar',
        name: 'Spezialization_Procedure',
      },
  },
  foreignKeys: [
    {
      name: 'FK_Procedures_Specialization',
      columnNames: ['Spezialization_Procedure'],
      referencedTableName: 'Specialization',
      referencedColumnNames: ['Spezialization_Name'],
    },
  ],
  relations: {
    Booking: {
      target: 'Booking',
      type: 'one-to-many',
      inverseSide: 'Procedures',
    },
    Specialization: {
      target: 'Specialization',
      type: 'many-to-one',
      joinColumn: {
        name: 'Spezialization_Procedure',
        referencedColumnName: 'Spezialization_Name',
      },
    },
  },
  indices: [
    {
      name: 'PK__Procedur__08F04902731D592A',
      unique: true,
      columns: ['Id_Procedure'],
    },
  ],
});

export default ProceduresSchema;
