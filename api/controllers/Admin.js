import ErrorUtils from "../utils/Errors.js";
import PsychologistService from "../services/Psychologist.js";
import AcademicDegreeService from "../services/AcademicDegree.js";
import StaticClass from "../static/StaticClass.js";
import TimeTableService from "../services/TimeTable.js";
import CollectionSpezializationService from "../services/CollectionSpezialization.js";
import VoucherService from "../services/Voucher.js";
import ProcedureService from "../services/Procedure.js";
import ReviewService from "../services/Review.js";

class AdminController {
    static async createPsychologist(req,res){
        try{
            const psychologist = await PsychologistService.createPsychologist(req.body);
            await TimeTableService.createTimeTable(psychologist.Id_Psychologist,req.body.timetable);
            await CollectionSpezializationService.createCollectionSpezialization(psychologist.Id_Psychologist,req.body.Specialization);
            await VoucherService.createVouchers(psychologist.Id_Psychologist);
            res.status(200).json({psychologist});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }

    static async updatePsychologist(req,res){
        try{
            const psychologist = await PsychologistService.updatePsychologist(req.body);
            await TimeTableService.updateTimeTable(psychologist.Id_Psychologist,req.body.timetable);
            await CollectionSpezializationService.updateCollectionSpezialization(psychologist.Id_Psychologist,req.body.Specialization);
            await VoucherService.createVouchers(psychologist.Id_Psychologist);
            res.status(200).json({psychologist});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async deletePsychologist(req,res){
        try{
            const Id_Psychologist = parseInt(req.params.Id_Psychologist, 10);
            await PsychologistService.deletePsychologist(Id_Psychologist);
            res.sendStatus(200);
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async createPsychologistVoucher(req,res){
        try{
            const {Id_Psychologist} = req.body;
            await VoucherService.createVouchers(Id_Psychologist);
            res.sendStatus(200);
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async createProcedure(req,res){
        try{
            const procedure = await ProcedureService.createProcedure(req.body);
            res.status(200).json({procedure});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async updateProcedure(req,res){
        try{
            const procedure = await ProcedureService.updateProcedure(req.body);
            res.status(200).json({procedure});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async deleteProcedure(req,res){
        try{
            const Id_Procedure = parseInt(req.params.Id_Procedure, 10);
            await ProcedureService.deleteProcedure(Id_Procedure);
            res.sendStatus(200);
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async deleteReviewClient(req,res){
        try{
            const Id_Review = parseInt(req.params.Id_Review,10);
            await ReviewService.deleteReviewWithoutClient(Id_Review);
            
            return res.sendStatus(200);
        } catch (err){
            return ErrorUtils.catchError(res, err);
        }
    }
    
    
}
export default AdminController;