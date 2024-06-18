import ProcedureService from "../services/Procedure.js";
import ErrorUtils from "../utils/Errors.js";

class ProcedureController {
    static async getAllProcedures(_,res){
        try{
            const allProcedures = await ProcedureService.getAllProcedures();
            
            return res.status(200).json({allProcedures});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async getProcedure(req,res){
        try{
            const Id_Procedure = parseInt(req.params.Id_Procedure,10);
            const procedure = await ProcedureService.getProcedure(Id_Procedure);
            return res.status(200).json({procedure});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    
}
export default ProcedureController;