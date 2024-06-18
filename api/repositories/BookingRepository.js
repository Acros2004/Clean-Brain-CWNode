class BookingRepository {
  constructor(repo) {
    this.repo = repo;
  }
  
  async getAll() {
    return this.repo.find();
  }

  async getAllWithInfo() {
    return this.repo.find({
      relations: {
        Voucher: true
      }
    });
  }
  
  async findById(id) {
    return this.repo.findOne({ where: { ID_Booking: id } });
  }

  async findByClientId(id) {
    return this.repo.find({
      where: {
        Id_Client: id
      },
      relations: ['Procedures', 'Voucher.Psychologist']
    });
  }

  async deleteByVoucherId(id) {
    return this.repo.delete({ Id_Voucher: id } );
  }

  async deleteByProcedureId(id) {
    return this.repo.delete({ Id_Procedure: id  });
  }
  
  async create(data) {
    return this.repo.save(data);
  }

  async update(ID_Booking, data) {
    return this.repo.update({ where: { ID_Booking }, data });
  }

  async delete(id) {
    return this.repo.delete({ ID_Booking: id });
  }
}
  
  export default BookingRepository;