import { EntitySchema } from 'typeorm';

const BookingSchema = new EntitySchema({
  name: 'Booking',
  tableName: 'Booking',
  schema: 'dbo',
  columns: {
    ID_Booking: {
      type: 'smallint',
      primary: true,
      generated: true,
      name: 'ID_Booking',
    },
    Date_Booking: {
      type: 'datetime',
      name: 'Date_Booking',
    },
    Time_Booking: {
      type: 'datetime',
      nullable: true,
      name: 'Time_Booking',
    },
    Id_Procedure: {
        type: 'int',
        name: 'Id_Procedure',
      },
      Id_Client: {
        type: 'int',
        name: 'Id_Client',
      },
      Id_Voucher: {
        type: 'int',
        name: 'Id_Voucher',
      },
  },
  indices: [
    {
      name: 'PK__Booking__473534427F4381D0',
      unique: true,
      columns: ['ID_Booking'],
    },
  ],
  foreignKeys: [
    {
      name: 'FK_Booking_Procedure',
      columnNames: ['Id_Procedure'],
      referencedTableName: 'Procedures',
      referencedColumnNames: ['Id_Procedure'],
    },
    {
      name: 'FK_Booking_Client',
      columnNames: ['Id_Client'],
      referencedTableName: 'Client',
      referencedColumnNames: ['Id_client'],
    },
    {
      name: 'FK_Booking_Voucher',
      columnNames: ['Id_Voucher'],
      referencedTableName: 'Voucher',
      referencedColumnNames: ['Id_Voucher'],
    },
  ],
  relations: {
    Procedures: {
      target: 'Procedures',
      type: 'many-to-one',
      joinColumn: {
        name: 'Id_Procedure',
        referencedColumnName: 'Id_Procedure',
      },
    },
    Client: {
      target: 'Client',
      type: 'many-to-one',
      joinColumn: {
        name: 'Id_Client',
        referencedColumnName: 'Id_client',
      },
    },
    Voucher: {
      target: 'Voucher',
      type: 'many-to-one',
      joinColumn: {
        name: 'Id_Voucher',
        referencedColumnName: 'Id_Voucher',
      },
    },
  },
});

export default BookingSchema;
