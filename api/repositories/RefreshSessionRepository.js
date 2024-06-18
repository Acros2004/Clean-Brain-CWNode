class RefreshSessionRepository {
  constructor(repo) {
    this.repo = repo;
  }
  async getRefreshSession(refreshToken) {
    return this.repo.find({
      where: {
        refresh_token: refreshToken
      }
    });
  }

  async createRefreshSession(data) {
    return this.repo.save(data);
  }

  async deleteRefreshSession(refreshToken) {
    return this.repo.delete({
        refresh_token: refreshToken
    });
  }
  
}

export default RefreshSessionRepository;
