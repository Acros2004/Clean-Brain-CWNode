class ClientRepository {
  constructor(repo) {
    this.repo = repo;
  }
  
  async getAll() {
    return this.repo.find();
  }
  
  async findById(id) {
    return this.repo.findOne({ where: { Id_client: id } });
  }

  async findByLogin(login) {
    return this.repo.find({ where: { Login_Client: login } });
  }
  
  async findByEmail(mail) {
    return this.repo.find({ where: { Mail_Client: mail } });
  }
  
  async create(data) {
    return this.repo.save(data);
  }

  async update(Id_client, user) {
    return this.repo.update(Id_client, {
      Name_Client: user.Name_Client,
      Surname_Client: user.Surname_Client,
      Photo_Client: user.Photo_Client
    });
  }

  async delete(id) {
    return this.repo.delete({Id_client: id});
  }
  }
  
  export default ClientRepository;