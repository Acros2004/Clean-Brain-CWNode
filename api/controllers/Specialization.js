import ErrorUtils from "../utils/Errors.js";
import SpecializationService from "../services/Specialization.js";

class SpecializationController {
    static async getAllSpecializations(req,res){
        try{
            const allSpecializations = await SpecializationService.getAllSpecializations();
            return res.status(200).json({allSpecializations});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
}
export default SpecializationController;