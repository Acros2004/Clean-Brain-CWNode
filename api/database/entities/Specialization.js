import { EntitySchema } from 'typeorm';

const SpecializationSchema = new EntitySchema({
  name: 'Specialization',
  tableName: 'Specialization',
  schema: 'dbo',
  columns: {
    Spezialization_Name: {
      type: 'nvarchar',
      length: 60,
      primary: true,
      name: 'Spezialization_Name',
    },
  },
  indices: [
    {
      name: 'PK__Speciali__4F7EC0A0EC7F687E',
      unique: true,
      columns: ['Spezialization_Name'],
    },
  ],
});

export default SpecializationSchema;
