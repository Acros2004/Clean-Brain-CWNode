class CollectionSpezializationRepository {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll() {
    return this.repo.find();
  }

  async getByPsychologistId(id) {
    return this.repo.find({
      where: {
        Id_Psychologist: id,
      },
    });
  }

  async findByName(name) {
    return this.repo.findOne({
      where: {
        Spezialization_Name: name,
      },
    });
  }

  async create(Id_Psychologist, data) {
    return this.repo.save({Id_Psychologist,Spezialization_Name:data});
  }

  async deleteByPsychologistIdAndSpecializationName(psychologistId, specializationName) {
    return this.repo.delete({
        Id_Psychologist: psychologistId,
        Spezialization_Name: specializationName,
    });
  }

  async deleteByPsychologistId(id) {
    return this.repo.delete({
        Id_Psychologist: id,
    });
  }
}

export default CollectionSpezializationRepository;
