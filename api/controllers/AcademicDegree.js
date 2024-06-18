import ErrorUtils from "../utils/Errors.js";
import AcademicDegreeService from "../services/AcademicDegree.js";

class AcademicDegreeController {
    static async getAllAcademicDegree(req,res){
        try{
            const allAcademicDegrees = await AcademicDegreeService.getAllAcademicDegrees();
            return res.status(200).json({allAcademicDegrees});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
}
export default AcademicDegreeController;