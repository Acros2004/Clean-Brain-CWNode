import StaticClass from "../static/StaticClass.js";

class TimeTableService{
    static async createTimeTable(Id_Psychologist,data){
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
              data[key] = StaticClass.parseTimeStringToDateTime(data[key]);
            }
        }
        data.Id_Psychologist = Id_Psychologist
        const timetable = await StaticClass.unit.timeTableRepository.create(data);
        return timetable;
    }
    static async updateTimeTable(Id_Psychologist,data){
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
              data[key] = StaticClass.parseTimeStringToDateTime(data[key]);
            }
        }
        const timetable = await StaticClass.unit.timeTableRepository.update(Id_Psychologist,data);
        return timetable;
    }
    static async deleteTimeTable(Id_Psychologist){
        await StaticClass.unit.timeTableRepository.deleteByPsychologgistId(Id_Psychologist);
    }
}

export default TimeTableService;