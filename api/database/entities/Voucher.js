import { EntitySchema } from 'typeorm';

const VoucherSchema = new EntitySchema({
  name: 'Voucher',
  tableName: 'Voucher',
  schema: 'dbo',
  columns: {
    Id_Voucher: {
      type: 'int',
      primary: true,
      generated: true,
      name: 'Id_Voucher',
    },
    Date_Voucher: {
      type: 'datetime',
      name: 'Date_Voucher',
    },
    Time_Voucher_Start: {
      type: 'datetime',
      name: 'Time_Voucher_Start',
    },
    Time_Voucher_End: {
      type: 'datetime',
      name: 'Time_Voucher_End',
    },
    Ordered: {
      type: 'nchar',
      length: 10,
      name: 'Ordered',
    },
    Id_Psychologist: {
      type: 'int',
      name: 'Id_Psychologist',
  },
  },
  foreignKeys: [
    {
      name: 'FK_Voucher_Psychologist',
      columnNames: ['Id_Psychologist'],
      referencedTableName: 'Psychologist',
      referencedColumnNames: ['Id_Psychologist'],
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
  },
  indices: [
    {
      name: 'PK__Voucher__964AD8505B5774F6',
      unique: true,
      columns: ['Id_Voucher'],
    },
  ],
});

export default VoucherSchema;
