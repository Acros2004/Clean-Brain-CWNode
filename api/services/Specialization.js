import StaticClass from "../static/StaticClass.js";

class SpecializationService{
    static async getAllSpecializations(){
        const Spezialization_Name = await StaticClass.unit.specializationRepository.getAll(); 
        return Spezialization_Name;
    }
}

export default SpecializationService;