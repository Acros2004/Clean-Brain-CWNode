import StaticClass from "../static/StaticClass.js";

class AcademicDegreeService{
    static async getAllAcademicDegrees(){
        const Academic_Name = await StaticClass.unit.degreeRepository.getAll(); 
        return Academic_Name;
    }
}

export default AcademicDegreeService;