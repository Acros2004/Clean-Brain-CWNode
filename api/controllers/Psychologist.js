import ErrorUtils from "../utils/Errors.js";
import PsychologistService from "../services/Psychologist.js";
import AcademicDegreeService from "../services/AcademicDegree.js";

class PsychologistController {
    static async getAllPsychologists(_,res){
        try{
            const allPsychologists = await PsychologistService.getAllPsychologists();
            return res.status(200).json({allPsychologists});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async getPsychologist(req,res){
        try{
            const Id_Psychologist = parseInt(req.params.Id_Psychologist,10);
            const psychologist = await PsychologistService.getPsychologist(Id_Psychologist);
            return res.status(200).json({psychologist});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    
}
export default PsychologistController;