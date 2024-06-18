class PsychologistRepository {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll() {
    return this.repo.find({
      relations: {
        CollectionSpezialization: true,
        Academic_Degree:true,
        Timetable:true,
        Voucher:true
      }
    });
  }

  async findById(Id_Psychologist) {
    return this.repo.findOne({ where: { Id_Psychologist } });
  }

  async findByIdWithAllInfo(Id_Psychologist) {
    return this.repo.findOne({
      where: { Id_Psychologist },
      relations: {
        CollectionSpezialization:true,
        Academic_Degree:true,
        Timetable:true,
        Voucher:true
      }
    });
  }

  async findByEmail(Mail_Psychologist) {
    return this.repo.find({ where: { Mail_Psychologist } });
  }

  async findByFIO(Name_Psychologist, Surname_Psychologist, Patronymic_Psychologist) {
    return this.repo.find({
      where: {
        Name_Psychologist,
        Surname_Psychologist,
        Patronymic_Psychologist
      }
    });
  }

  async create(data) {
    return this.repo.save(data);
  }

  async update(Id_Psychologist, psychologist) {
    return this.repo.update(Id_Psychologist, psychologist);
  }

  async delete(id) {
    return this.repo.delete({Id_Psychologist: id});
  }
  }
  
  export default PsychologistRepository;