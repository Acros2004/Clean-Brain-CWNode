class ReviewRepository {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll() {
    return this.repo.find();
  }

  async findById(Id_Review) {
    return this.repo.findOne({ where: { Id_Review } });
  }

  async findByClientId(Id_Client) {
    return this.repo.find({ where: { Id_Client } });
  }

  async create(data) {
    return this.repo.save(data);
  }

  async update(Id_Review, data) {
    return this.repo.update(Id_Review, data);
  }

  async delete(id) {
    return this.repo.delete({ Id_Review:id});
  }
  }
  
  export default ReviewRepository;