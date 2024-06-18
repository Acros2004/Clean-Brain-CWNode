import { EntitySchema } from 'typeorm';

const AcademicDegreeSchema = new EntitySchema({
  name: 'Academic_Degree',
  tableName: 'Academic_Degree',
  schema: 'dbo',
  columns: {
    Academic_Name: {
      type: 'nvarchar',
      length: 60,
      primary: true,
      name: 'Academic_Name',
    },
  },
  indices: [
    {
      name: 'PK__Academic__BB1A9988FE8D3B32',
      unique: true,
      columns: ['Academic_Name'],
    },
  ],
});

export default AcademicDegreeSchema;
