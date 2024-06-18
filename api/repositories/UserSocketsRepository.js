class UserSocketsRepository {
    constructor(repo) {
      this.repo = repo;
    }
    async getAll() {
        return this.repo.find();
      }
    async findById(id) {
      return this.repo.find({
         where: { 
          userId : id 
        } 
      });
    }
    async create(data) {
      return this.repo.save(data);
    }
  
    async update(id, data) {
      return this.repo.update(id,
      {
        userId: data.userId,
        socketId: data.socketId
      });
    }
  
    async delete(id) {
      return this.repo.delete({ userId: id });
    }
    async deleteBySocketId(id) {
        return this.repo.delete({ socketId: id });
    }
  }
  
  export default UserSocketsRepository;