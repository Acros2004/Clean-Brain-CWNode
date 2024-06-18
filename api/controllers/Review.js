import ErrorUtils from "../utils/Errors.js";
import PsychologistService from "../services/Psychologist.js";
import AcademicDegreeService from "../services/AcademicDegree.js";
import ReviewService from "../services/Review.js";

class ReviewController {
    static async getAllReviews(_,res){
        try{
            const allReviews = await ReviewService.getAllReviews();
            return res.status(200).json({allReviews});
        } catch(err){
            return ErrorUtils.catchError(res, err);
        }
    }
}
export default ReviewController;