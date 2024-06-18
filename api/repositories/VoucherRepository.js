class VoucherRepository {
  constructor(repoVoucher,repoBooking) {
    this.repoVoucher = repoVoucher;
    this.repoBooking = repoBooking;
  }

  async getAll() {
    return this.repoVoucher.find();
  }

  async deleteVoucher(id) {
    return this.repoVoucher.delete({
        Id_Voucher:id,
    });
  }

  async findById(id) {
    return this.repoVoucher.findOne({
      where: {
        Id_Voucher:id,
      },
    });
  }
  async findByPsychologistId(id) {
    return this.repoVoucher.find({
      where: {
        Id_Psychologist:id,
      },
    });
  }

  async create(data) {
    return this.repoVoucher.save(data);
  }

  async update(Id_Voucher, data) {
    return this.repoVoucher.update(Id_Voucher ,
      {
        Ordered: data.Ordered
      }
      );
  }

  async delete(id) {
    return this.repoVoucher.delete({
        Id_Voucher: id,
    });
  }

  async deleteAll() {
    return this.repoVoucher.clear();
  }

  async deleteNotOrdered(id) {
    return this.repoVoucher.delete({
        Ordered: "Нет",
        Id_Psychologist: id,
    });
  }

  async deleteOldVouchers(id) {
    const Vouchers = await this.repoVoucher.find({
      where: {
        Id_Psychologist: id,
        Date_Voucher: {
          lt: new Date(),
        },
      },
    });

    for (const Voucher of Vouchers) {
      if (Voucher.ordered === "Нет") {
        await this.repoVoucher.delete({
            Id_Voucher: Voucher.Id_Voucher,
        });
      } else {
        await this.repoBooking.delete({
            Id_Voucher: Voucher.Id_Voucher,
        });
        await this.repoVoucher.delete({
            Id_Voucher: Voucher.Id_Voucher,
        });
      }
    }
  }

  async deleteAllById(id) {
    return this.repoVoucher.delete({
        Id_Psychologist: id,
    });
  }
}

export default VoucherRepository;
