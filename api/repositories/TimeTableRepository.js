class TimeTableRepository {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll(){
      return this.repo.find();
  }
  async findById(Id_Psychologist) {
    return this.repo.findOne({ where: { Id_Psychologist } });
  }

  async create(data) {
    return this.repo.save(data);
  }

  async update(Id_Psychologist, timetable) {
    return this.repo.update(
      Id_Psychologist,
      {
        MondStart: timetable.MondStart,
        MondEnd: timetable.MondEnd,
        TueStart: timetable.TueStart,
        TueEnd: timetable.TueEnd,
        WenStart: timetable.WenStart,
        WenEnd: timetable.WenEnd,
        ThuStart: timetable.ThuStart,
        ThuEnd: timetable.ThuEnd,
        FriStart: timetable.FriStart,
        FriEnd: timetable.FriEnd,
    });
  }

  async deleteByPsychologgistId(id) {
    return this.repo.delete({
        Id_Psychologist: id 
    });
  }
  }
  
  export default TimeTableRepository;