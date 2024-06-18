class SpecializationRepository {
  constructor(repo) {
    this.repo = repo;
  }
  
  async getAll(){
      return this.repo.find();
  }
  async findByName(name) {
    return this.repo.findOne({ where: { Spezialization_Name : name } });
  }
  }
  
  export default SpecializationRepository;