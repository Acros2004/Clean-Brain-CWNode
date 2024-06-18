class DegreeRepository {
  constructor(repo) {
    this.repo = repo;
  }
  
  async getAll() {
    return this.repo.find();
  }
  
  async findByName(academicName) {
    return this.repo.findOne({ where: { Academic_Name: academicName } });
  }
  }
  
  export default DegreeRepository;