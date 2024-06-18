class ProceduresRepository {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll() {
    return this.repo.find();
  }

  async findById(id) {
    return this.repo.findOne({ where: { Id_Procedure: id } });
  }

  async findByName(name) {
    return this.repo.find({
      where: { Name_Procedure: name }
    });
  }

  async create(data) {
    return this.repo.save(data);
  }

  async update(Id_Procedure, data) {
    return this.repo.update(Id_Procedure, {
      Name_Procedure: data.Name_Procedure,
      Price: data.Price,
      Depiction: data.Depiction,
      Spezialization_Procedure: data.Spezialization_Procedure,
      Photo_Procedure: data.Photo_Procedure,
    });
  }

  async delete(id) {
    return this.repo.delete({Id_Procedure: id});
  }
  }
  
  export default ProceduresRepository;