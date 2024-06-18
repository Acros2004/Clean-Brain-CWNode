class EmailAuthenticationRepository {
  constructor(repo) {
    this.repo = repo;
  }
  
  async getAll() {
    return this.repo.find();
  }
  
  async findById(Id_Auth) {
    return this.repo.findOne({ where: { Id_Auth } });
  }
  
  async findByEmail(Mail_Client) {
    return this.repo.find({ where: { Mail_Client } });
  }
  
  async create(data) {
    return this.repo.save(data);
  }

  async update(Id_Auth, data) {
    return this.repo.update(Id_Auth, data);
  }

  async delete(id) {
    return this.repo.delete({Id_Auth : id});
  }
  }
  
  export default EmailAuthenticationRepository;